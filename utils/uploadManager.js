const fs = require('fs/promises'); 
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // v4 is to generate random uuids
const Logger = require('../logging/logger');

const saveImage = async (image, type) => {
    const shortUuid = uuidv4().split('-')[0]; // Use only the first part of the UUID
    const imageFilename = `${type}-${shortUuid}-${Date.now()}` + path.extname(image.originalname);
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