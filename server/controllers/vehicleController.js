const Vehicle = require("../models/vehicle");

const getVehicles = async () => {
    const data = await Vehicle.findAll({});
    return data;
}

const getVehicle = async (id) => {
    const data = await Vehicle.findOne({where: {id: id}});
    return data;
}

const getVehiclesByUser = async (id) => {
    const data = await Vehicle.findAll({where: {userId: id}});
    return data;
}

const getVehiclesByType = async (type) => {
    const data = await Vehicle.findAll({where: {type: type}});
    return data;
}

const createVehicle = async (data) => {
    const vehicle = await Vehicle.create(data);
    return vehicle;
}

const updateVehicle = async (id, data) => {
    const vehicle = await Vehicle.update(data, {where: {id: id}});
    return vehicle;
}

const deleteVehicle = async (id) => {
    const vehicle = await Vehicle.destroy({where: {id: id}});
    return vehicle;
}

module.exports = {
    getVehicles,
    getVehicle,
    getVehiclesByUser,
    getVehiclesByType,
    createVehicle,
    updateVehicle,
    deleteVehicle
};
