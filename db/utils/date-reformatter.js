
function articlesReformatter(articlesArr) {

   let output = []
    
    for (let i = 0; i < articlesArr.length; i++) {
    const article = {...articlesArr[i], created_at : new Date(articlesArr[i].created_at)}
        
    output.push(article)
}
    return output
}

function commentsReformatter(commentsArr) {

   let output = []
    
    for (let i = 0; i < commentsArr.length; i++) {
    const comment = {...commentsArr[i], created_at : new Date(commentsArr[i].created_at)}
        
    output.push(comment)
}
    return output
}
module.exports = {articlesReformatter, commentsReformatter};