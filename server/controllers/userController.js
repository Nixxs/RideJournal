const User = require("../models/user");

const getUsers = async () => {
    const data = await User.findAll({});
    return data;
}

const getUser = async (id) => {
    const data = await User.findOne({where: {id: id}});
    return data;
}

const createUser = async (data) => {
    const user = await User.create(data);
    return user;
}

const updateUser = async (id, data) => {
    const user = await User.update(data, {where: {id: id}});
    return user;
}

const deleteUser = async (id) => {
    const user = await User.destroy({where: {id: id}});
    return user;
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
