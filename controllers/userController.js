const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const { saveImage } = require("../utils/uploadManager");

const getUsers = async () => {
    const data = await User.findAll({});
    return data;
}

const getUser = async (id) => {
    const data = await User.findOne({where: {id: id}});
    return data;
}

const getUserIncludeVehicles = async (id) => {
    const data = await User.findOne({ where: { id: id }, include: [{model: Vehicle }]});
    return data;
}

const getUserByEmail = async (email) => { 
    const data = await User.findOne({ where: { email: email } });
    return data;
};

const createUser = async (data) => {
    const { image, ...userData } = data;
    // if there is an image in the data to handle
    if (image){
        userData.image = await saveImage(image, "user");
    } else {
        userData.image = "default.png";
    }
    // do the database create line here
    const user = await User.create(userData);
    return user;
}

const updateUser = async (id, data, tokenUserId) => {
    // if the user to be updated is not the same as the token user reject
    if (id !== tokenUserId) {
        return 401;
    }
    
    const { image, ...userData } = data;
    // if there is an image in the data to handle
    if (image){
        userData.image = await saveImage(image, "user");
    } 
    // do the database create line here
    const updateResponse = await User.update(userData, {where: {id: id}});

    if (updateResponse[0] === 0) {
        return null;
    } else {
        const user = await User.findOne({where: {id: id}});
        return user;
    }
}

const deleteUser = async (id) => {
    const user = await User.destroy({where: {id: id}});
    return user;
}

module.exports = {
    getUsers,
    getUser,
    getUserIncludeVehicles,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
