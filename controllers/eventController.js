const Event = require("../models/event");
const Vehicle = require("../models/vehicle");

const getEvents = async () => {
    const data = await Event.findAll({
        order: [["CreatedAt", "DESC"]]
    });
    return data;
}

const getEvent = async (id) => {
    const data = await Event.findOne({where: {id: id}});
    return data;
}

const getEventIncludeAll = async (id) => {
    const data = await Event.findOne({ where: { id: id }, include: { all: true }});
    return data;
}

const getEventsByVehicle = async (id) => {
    const data = await Event.findAll({where: {vehicleId: id}});
    return data;
}

const getEventsByType = async (type) => {
    const data = await Event.findAll({where: {type: type}});
    return data;
}

const createEvent = async (data, tokenUserId) => {
    const { vehicleId, ...eventData } = data;
    const vehicleOwnerData = await Vehicle.findOne({where: {id: vehicleId}});
    if (Number(vehicleOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    const event = await Event.create(data);
    return event;
}

const updateEvent = async (id, data, tokenUserId) => {
    const eventData = await Event.findOne({where: {id: id}});
    const vehicleId = eventData.vehicleId;
    const vehicleOwnerData = await Vehicle.findOne({where: {id: vehicleId}});
    if (Number(vehicleOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    const event = await Event.update(data, {where: {id: id}});
    return event;
}

const deleteEvent = async (id, tokenUserId) => {
    const eventData = await Event.findOne({where: {id: id}});
    const vehicleId = eventData.vehicleId;
    const vehicleOwnerData = await Vehicle.findOne({where: {id: vehicleId}});
    if (Number(vehicleOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    const event = await Event.destroy({where: {id: id}});
    return event;
}

module.exports = {
    getEvents,
    getEvent,
    getEventIncludeAll,
    getEventsByVehicle,
    getEventsByType,
    createEvent,
    updateEvent,
    deleteEvent
};
