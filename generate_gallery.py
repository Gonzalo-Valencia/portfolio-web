
import os
from pathlib import Path
from datetime import datetime

# Configuration
IMAGE_FOLDER = Path("images\portraits")
OUTPUT_FILE = Path("gallery.html")

# Supported image formats
IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif",
    ".webp", ".bmp", ".tiff", ".svg"
}


def generate_gallery():
    # Find all images in the folder
    images = [
        file for file in IMAGE_FOLDER.iterdir()
        if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS
    ]

    # Sort by modification date (newest first)
    images.sort(key=lambda file: file.stat().st_mtime, reverse=True)

    # Generate HTML
    html = []

    for position, image in enumerate(images):
        relative_path = image.as_posix()

        html.append(f'''                <img 
                    src="{relative_path}"
                    onclick="openImage({position})"
                    class="gallery-img"
                />''')

    # Write output file
    OUTPUT_FILE.write_text("\n\n".join(html), encoding="utf-8")

    print(f"Generated {OUTPUT_FILE} with {len(images)} images.")


if __name__ == "__main__":
    generate_gallery()
