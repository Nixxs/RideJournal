const Image = require("../models/image");
const Event = require("../models/event");
const Vehicle = require("../models/vehicle");
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

const createImage = async (data, tokenUserId) => {
    // ther tokenuser must own the parent vehicle of the parent event of the image
    const eventData = await Event.findOne({where: {id: data.eventId}});
    const vehicleId = eventData.vehicleId;
    const vehicleOwnerData = await Vehicle.findOne({where: {id: vehicleId}});
    if (Number(vehicleOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    let imageData = {...data};
    // if there is an image in the data to handle
    imageData.image = await saveImage(data.image, "event");

    const image = await Image.create(imageData);
    return image;
}

module.exports = {
    getImages,
    getImage,
    getImagesByEvent,
    createImage
};
