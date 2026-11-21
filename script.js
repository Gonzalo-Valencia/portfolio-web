function resizeGallery() {
    const gallery = document.querySelector('.gallery');
    const images = [...gallery.querySelectorAll('img')];

    const gap = 10;
    const containerWidth = gallery.clientWidth;
    let targetHeight = 250;
    const maxHeight = 500;

    let rowWidth = 30;
    let actualRow = 1;
    let rowDict = {};

    images.forEach((img, index) => {
        const ratio = img.naturalWidth / img.naturalHeight;
        const width = ratio * targetHeight;

        // Check if the image fits BEFORE adding it
        if (rowWidth + width + gap > containerWidth && rowDict[actualRow]?.length) {

            const height = targetHeight * (containerWidth - 30) / (rowWidth - 30 - gap);
            rowDict[actualRow].forEach(item => {
                item.img.style.height = `${height}px`;
            });

            actualRow++;
            rowWidth = 30;
        }

        (rowDict[actualRow] ??= []).push({ img, ratio });
        rowWidth += width + gap;

        if (index === images.length - 1) {
            rowWidth -= gap;

            let height = targetHeight * (containerWidth - 30) / (rowWidth - 30);

            // If the last row is too tall, merge it with the previous row
            if (height > maxHeight && actualRow > 1) {
                const previousRow = rowDict[actualRow - 1];
                const lastRow = rowDict[actualRow];
                const combined = [...previousRow, ...lastRow];

                const totalRatio = combined.reduce((sum, item) => sum + item.ratio, 0);
                height = (containerWidth - 30 - (combined.length - 1) * gap) / totalRatio;

                combined.forEach(item => {
                    item.img.style.height = `${height}px`;
                });
            } else {
                rowDict[actualRow].forEach(item => {
                    item.img.style.height = `${height}px`;
                });
            }
        }
    });
}



let galleryImages;
let galleryIndex = 0;

document.addEventListener("DOMContentLoaded", () => {

    galleryImages = document.querySelectorAll(".gallery-img");

    // Open image
    window.openImage = function(n) {
        galleryIndex = n;

        document.getElementById("lightbox").style.display = "flex";
        updateImage();
    };

    // Change image
    window.changeImage = function(direction) {
        galleryIndex += direction;

        // Loop back to the beginning or end
        if (galleryIndex >= galleryImages.length) {
            galleryIndex = 0;
        }

        if (galleryIndex < 0) {
            galleryIndex = galleryImages.length - 1;
        }

        updateImage();
    };

    // Update displayed image
    function updateImage() {
        document.getElementById("expanded-img").src =
            galleryImages[galleryIndex].src;
    }

    // Close lightbox
    window.closeImage = function() {
        document.getElementById("lightbox").style.display = "none";
    };

});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeImage();
    }
    if (event.key === "ArrowRight") {
        changeImage(1);
    }
    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
});

function closeOnOutsideClick(event) {
    if (
        event.target.tagName !== "BUTTON" &&
        event.target.tagName !== "SPAN"
    ) {
        closeImage();
    }
}






// To add the header
document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Highlight the current page
            const currentPage = window.location.pathname.split("/").pop();

            document.querySelectorAll("header a").forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => {
            console.error('Error loading the header:', error);
        });
});


// To add the footer
document.addEventListener("DOMContentLoaded", function() {
  fetch('footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading the footer:', error);
    });
});







window.addEventListener('load', resizeGallery);
window.addEventListener('resize', resizeGallery);