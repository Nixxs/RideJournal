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

const createComment = async (data, tokenUserId) => {
    if (Number(data.userId) !== tokenUserId) {
        return 401;
    }
    const comment = await Comment.create(data);
    return comment;
}

const updateComment = async (id, data, tokenUserId) => {
    const commentOwnerData = await Comment.findOne({ where: { id: id } });
    if (Number(commentOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    const comment = await Comment.update(data, { where: { id: id } });
    return comment;
}

const deleteComment = async (id, tokenUserId) => {
    const commentOwnerData = await Comment.findOne({ where: { id: id } });
    if (Number(commentOwnerData.userId) !== tokenUserId) {
        return 401;
    }
    const comment = await Comment.destroy({ where: { id: id } });
    return comment;
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getComment,
    getCommentsByEvent,
    getCommentsByUser,
};