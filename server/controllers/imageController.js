const Image = require("../models/image");

const getImages = async () => {
    const data = await Image.findAll({});
    return data;
}

const getImage = async (id) => {
    const data = await Image.findOne({where: {id: id}});
    return data;
}

const getImagesByEvent = async (id) => {
    const data = await Image.findOne({where: {eventId: id}});
    return data;
}

const createImage = async (data) => {
    const image = await Image.create(data);
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
