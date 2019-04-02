
function commentsReformatter(comments, articles) {
   
    const articleidMaker = {};
    for (let i = 0; i < articles.length; i++) {
        articleidMaker[articles[i].title] = articles[i].article_id;
    }

   return comments.map(({belongs_to, created_at, created_by, ...commentKeys}) => {
        return {
            article_id : articleidMaker[belongs_to], 
            created_at : new Date(created_at), 
            author : created_by,
            ...commentKeys
        }
    })
}

module.exports = {commentsReformatter}