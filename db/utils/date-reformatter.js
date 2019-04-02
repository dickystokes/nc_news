
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
    const article = {...commentsArr[i], created_at : new Date(commentsArr[i].created_at)}
        
    output.push(article)
}
    return output
}
module.exports = {articlesReformatter, commentsReformatter};