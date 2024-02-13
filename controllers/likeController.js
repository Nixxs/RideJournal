const Like = require("../models/like");

const getLikes = async () => {
    const data = await Like.findAll({});
    return data;
}

const getLike = async (id) => {
    const data = await Like.findOne({where: {id: id}});
    return data;
}

const getLikesByEvent = async (id) => {
    const data = await Like.findAll({where: {eventId: id}});
    return data;
}

const getLikesByUser = async (id) => {
    const data = await Like.findAll({where: {userId: id}});
    return data;
}

const createLike = async (data) => {
    const like = await Like.create(data);
    return like;
}

const deleteLike = async (id) => {
    const like = await Like.destroy({where: {id: id}});
    return like;
}

module.exports = {
    getLikes,
    getLike,
    getLikesByEvent,
    getLikesByUser,
    createLike,
    deleteLike
};
