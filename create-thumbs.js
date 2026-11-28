
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './images/Important';
const outputFolder = './images/Important/thumbnails';

async function processFolder(folder) {

    const items = fs.readdirSync(folder, {
        withFileTypes: true
    });

    for (const item of items) {

        const inputPath = path.join(folder, item.name);

        // Skip the thumbnails folder itself
        if (inputPath === outputFolder ||
            inputPath.startsWith(outputFolder + path.sep)) {
            continue;
        }

        // If it's a folder, explore it recursively
        if (item.isDirectory()) {
            await processFolder(inputPath);
            continue;
        }

        // Supported image formats
        if (!/\.(jpg|jpeg|png|webp|tiff)$/i.test(item.name)) {
            continue;
        }

        // Preserve relative folder structure
        const relativePath = path.relative(inputFolder, folder);

        const destinationFolder = path.join(
            outputFolder,
            relativePath
        );

        fs.mkdirSync(destinationFolder, {
            recursive: true
        });

        const outputName =
            path.parse(item.name).name + '.webp';

        const outputPath = path.join(
            destinationFolder,
            outputName
        );

        try {
            await sharp(inputPath)
                .resize({
                    /* width: 400, */
                    width: 1024,
                    withoutEnlargement: true
                })
                .webp({
                    quality: 90
                    /* quality: 70 */
                })
                .toFile(outputPath);

            console.log(`Generated: ${outputPath}`);

        } catch (error) {
            console.error(`Error processing ${inputPath}:`, error);
        }
    }
}

processFolder(inputFolder)
    .then(() => console.log('All thumbnails generated!'))
    .catch(console.error);
