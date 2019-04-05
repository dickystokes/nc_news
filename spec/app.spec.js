process.env.NODE_ENV = 'test';

const chai = require('chai')
const { expect }= chai
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted)
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe('/topics', () => {
    it('GET status 200 and returns a "topics" obejct with keys slug and description', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          //expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[0]).to.have.any.keys('slug', 'description');
        });
    });
  });

  describe('/articles', () => {
    it('GET status 200 and the correct column headings', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          //console.log(res.body)
          expect(res.body.articles[0]).to.have.any.keys('aticle_id', 'author', 'body', 'created_at', 'title', 'topic', 'votes')
        });
    });

    it('GET status 200 and comment_count', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).to.have.any.keys('comment_count')
        });
    });

    it('GET status 200 and queries by author', () => {
      return request
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(3)
        })
    });

    it('GET status 200 and queries by topic', () => {
      return request
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).to.equal(11)
        })
    });

    it('GET status 200 and orders by any valid column, date default', () => {
      return request
        .get('/api/articles?sort_by=articles.votes')
        .expect(200)
        .then((res) => {
          //console.log(res.body.articles)
          expect(res.body.articles).to.be.sortedBy('votes', {descending: true})
        })
    });

    it('GET status 200 and returns a specific article ID query', () => {
      return request
        .get('/api/articles/1')
        .expect(200)
        .then((res) => {
          //console.log(res.body.article)
          expect(res.body.article.article_id).to.equal(1)
        })
    });

    it('GET status 400 responds with err message when request is made with bad ID', () => {
      return request
        .get('/api/articles/abc')
        .expect(400)
    });

    it('GET status 404 responds with err message when request is made with an ID that doest exist', () => {
      return request
        .get('/api/articles/1000')
        .expect(404)
    });

    it('GET status 202 and update number of votes by 1', () => {
      return request
        .patch('/api/articles/1?vote_inc=1')
        .expect(202)
        .then((res) => {
          //console.log(res.body.article[0].votes)
          expect(res.body.article[0].votes).to.equal(101)
        })
    });

    it('GET status 202 and update number of votes by -1', () => {
      return request
        .patch('/api/articles/1?vote_inc=-1')
        .expect(202)
        .then((res) => {
          //console.log(res.body.article[0].votes)
          expect(res.body.article[0].votes).to.equal(99)
        })
    });

    it('GET status 204 and removes article', () => {
      return request
        .delete('/api/articles/2')
        .expect(204)
        .then((res) => {
          return request
          .get('/api/articles')
          .then((res) => {
            res.body.articles.forEach(article => {
              expect(article.article_id !== 2).to.equal(true)
            })
          
          })
        });
      });
    });

    it('GET status 200 and retreives comments for given article_id', () => {
      return request
        .get('/api/articles/1/comments')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0]).to.have.any.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
          res.body.comments.forEach(comment => {
            expect(comment.article_id).to.eql(1)

          })
        });
      });
      

    it('GET status 200 and sorts comments for given article_id', () => {
      return request
        .get('/api/articles/1/comments?sort_by=created_at')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.sortedBy('created_at', {descending: true}) 
        });
    });

    it('GET status 202 and posts new comment', () => {
      return request
        .post('/api/articles/1/comments')
        .send({username: 'icellusedkars', body : 'new comment about article 1'})
        .expect(202)
        .then((res) => {
          expect(res.body.comment[0].comment_id).to.eql(19)
          expect(res.body.comment[0].author).to.eql('icellusedkars')
          expect(res.body.comment[0].body).to.eql('new comment about article 1')
        });
    });
  

  describe('/comments', () => {
    it('GET 202 updates comment votes', () => {
      return request
      .patch('/api/comments/1?vote_inc=1')
        .expect(202)
        .then((res) => {
          expect(res.body.comment[0].votes).to.equal(17)
          return request
          .patch('/api/comments/1?vote_inc=3')
          .expect(202)
          .then((res) => {
            expect(res.body.comment[0].votes).to.equal(20)
            return request
            .patch('/api/comments/1?vote_inc=-10')
            .expect(202)
            .then((res) => {
              expect(res.body.comment[0].votes).to.equal(10)
            });
          });
        });
      });
    it('GET 204 deletes comment', () => {
      return request
      .delete('/api/comments/2')
        .expect(204)
        .then((res) => {
          // return request
          // .get('/api/comments/2')
          // .expect(404)
        });
    });
  });
  


  describe('/users', () => {
    it('GET status 200 and returns a user by username buter_bridge', () => {
      return request 
      .get('/api/users/butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.eql([{
          username: 'butter_bridge',
          avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          name: 'jonny' 
          }])
      })
      
    });

    it('GET status 200 and returns a user by username icellusedkars', () => {
      return request 
      .get('/api/users/icellusedkars')
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.eql([{
          username: 'icellusedkars',
          name: 'sam',
          avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
        }])
      }) 
    }); 

    it('GET 405 errors for methods not allowed', () => {
      return request
      .put('/api/users')
      .expect(405)
      .then(res => {
        expect(res.body.msg).to.eql('Method Not Allowed')
      })
    })

  });
});
