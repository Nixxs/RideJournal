// comments controller
const Comment = require('../models/comment');

const getComments = async () => {
    const data = await Comment.findAll({});
    return data;
}

const getComment = async (id) => {
    const data = await Comment.findOne({ where: { id: id } });
    return data;
}

const getCommentsByEvent = async (id) => {
    const data = await Comment.findAll({ where: { eventId: id } });
    return data;
}

const getCommentsByUser = async (id) => {
    const data = await Comment.findAll({ where: { userId: id } });
    return data;
}

const createComment = async (data) => {
    const comment = await Comment.create(data);
    return comment;
}

const updateComment = async (id, data) => {
    const comment = await Comment.update(data, { where: { id: id } });
    return comment;
}

const deleteComment = async (id) => {
    const comment = await Comment.destroy({ where: { id: id } });
    return comment;
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getComment,
    getCommentIncludeAll,
    getCommentsByEvent,
    getCommentsByUser,
};