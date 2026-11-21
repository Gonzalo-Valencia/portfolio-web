import os
import json

"""A program that takes the images in image_dir and writes the html code automatically for the
gallery"""

# Define folders and files
image_dir = 'images/portraits/'
output_file = 'code.txt'

# Allowed image extensions
image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')


# Scan the folder for files ending with image extensions
image_files = [
    image_name for image_name in os.listdir(image_dir)
    if os.path.isfile(os.path.join(image_dir, image_name)) and image_name.lower().endswith(image_extensions)
]

with open(output_file, 'w') as f:
    pass
# Write the list to code.txt
with open(output_file, 'a') as f:
    for name in image_files:
        f.write('<img src= "images/portraits/' + name + '"/>\n')