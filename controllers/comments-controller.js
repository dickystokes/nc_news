const { fetchCommentsByArticleID, sendNewComment, updateCommentVote, deleteCommentByID} = require('../models/comments-model');

exports.getCommentsByArticleID = (req, res, next) => {
    fetchCommentsByArticleID(req.params.article_id)
    .then(comments => {
      res.status(200).send({comments})
    })
}

exports.postNewComment = (req, res) => {
    sendNewComment(req)
    .then(comment => {
        res.status(202).send({comment})
    })
}

exports.patchComment = (req, res, next) => {
    updateCommentVote(req.params.comment_id, req.query.vote_inc)
    .then(comment => {
        res.status(202).send({comment})
    })
}

exports.deleteComment = (req, res, next) => {
    deleteCommentByID(req.params.comment_id)
    .then(comment => {
        res.status(204).send()
    })
}