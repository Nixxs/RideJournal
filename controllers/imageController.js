const Image = require("../models/image");
const { saveImage } = require("../utils/uploadManager");

const getImages = async () => {
    const data = await Image.findAll({});
    return data;
}

const getImage = async (id) => {
    const data = await Image.findOne({where: {id: id}});
    return data;
}

const getImagesByEvent = async (id) => {
    const data = await Image.findAll({where: {eventId: id}});
    return data;
}

const createImage = async (data) => {
    let imageData = {...data};
    // if there is an image in the data to handle
    imageData.image = await saveImage(data.image, "event");

    const image = await Image.create(imageData);
    return image;
}

const deleteImage = async (id) => {
    const image = await Image.destroy({where: {id: id}});
    return image;
}

module.exports = {
    getImages,
    getImage,
    getImagesByEvent,
    createImage,
    deleteImage
};
