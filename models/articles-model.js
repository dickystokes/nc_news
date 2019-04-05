const connection = require('../db/connection');

exports.fetchArticles = ({
  author, 
  topic,
  sort_by = 'articles.created_at', 
  order = 'desc',
  
}) => {
  return connection
    .select('articles.article_id', 'articles.author', 'articles.body', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
    .where((builder) => {
      if (author) builder.where('articles.author', '=', author);
      if (topic) builder.where('articles.topic', '=', topic);
    })
    .count({comment_count : 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .from('articles')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
};

exports.fetchArticleByID = (article_id) => {
  const articlesQuery = connection
    .select('articles.article_id', 'articles.author', 'articles.body', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
    .count({comment_count : 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .from('articles')
    .groupBy('articles.article_id')
    if({article_id}) articlesQuery.where('articles.article_id', '=', article_id)
    console.log({article_id})
    return articlesQuery
};

exports.updateArticleByID = (article_id, amount) => {
  return connection('articles')
  .where('articles.article_id', '=', article_id)
  .increment('votes', amount)
  .returning('*') 
}

exports.deleteArticleByID = (article_id) => {
  return connection('articles')
  .where('articles.article_id', '=', article_id)
  .del()
}

