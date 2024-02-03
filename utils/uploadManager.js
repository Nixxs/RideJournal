const fs = require('fs/promises'); 
const path = require('path');
const Logger = require('../logging/logger');

const saveImage = async (image) => {
    const imageFilename = `image_${Date.now()}` + path.extname(image.originalname);
    const filePath = path.join(__dirname, '../public/images', imageFilename);
    try {
        await fs.writeFile(filePath, image.buffer);
        return imageFilename;
    } catch (error) {
        Logger.error(`Error writing the image file (${imageFilename}): ${error}`);
        // Handle the error appropriately
        throw error;
    }
}

module.exports = { saveImage }