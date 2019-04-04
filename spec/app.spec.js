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
          expect(res.body.article.length).to.equal(1)
          expect(res.body.article[0].article_id).to.equal(1)
        })
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
    
  });
});
