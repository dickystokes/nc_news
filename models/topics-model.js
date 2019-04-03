const connection = require('../db/connection');

exports.fetchTopics = ({
  
}) => {
  return connection
    .select('*')
    // .where((builder) => {
    //   if (colour) builder.where('colour', '=', colour);
    //   if (max_age) builder.where('age', '<=', max_age);
    //   if (min_age) builder.where('age', '>=', min_age);
    //   if (max_price) builder.where('cost_at_auction', '<=', max_price);
    //   if (min_price) builder.where('cost_at_auction', '>=', min_price);
    // })
    .from('topics')
    
};