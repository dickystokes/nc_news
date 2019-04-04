const connection = require('../db/connection');

exports.fetchCommentsByArticleID = (article_id, sort_by = "created_at", order = "desc") => {
    return connection('comments')
    .where('comments.article_id', '=', article_id)
    .orderBy(sort_by, order)
    .returning('*')
  }

exports.sendNewComment = (req) => {
    return connection('comments')
    .where('comments.article_id', '=', req.params.article_id)
    .insert({
        author: req.body.username,
        body: req.body.body,
        article_id: req.params.article_id,
        })
    .returning('*')
}

exports.updateCommentVote = (comment_id, amount) => {
    return connection('comments')
    .where('comment_id', '=', comment_id)
    .increment('votes', amount)
    .returning('*')
}

exports.deleteCommentByID = (comment_id) => {
    return connection('comments')
    .where('comments.comment_id', '=', comment_id)
}