const { expect } = require('chai')
const {articlesReformatter} = require('../db/utils/date-reformatter')
const { commentsReformatter } = require('../db/utils/comments-reformatter')

    describe('comments date reformatter', () => {
        
        it('returns an array of objects in the correct format for seed length 1', () => {
            const test1 = [{
              body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              belongs_to: "They're not exactly dogs, are they?",
              created_by: 'butter_bridge',
              votes: 16,
              created_at: 1511354163389
            }]
            
            const output1 = [{
              body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              belongs_to: "They're not exactly dogs, are they?",
              created_by: 'butter_bridge',
              votes: 16,
              created_at: new Date(1511354163389)
            }]
            expect(commentsReformatter(test1)).to.eql(output1)
        })

        it('returns an array of objects in the correct format for seed for any length', () => {
            const test2 = [{
                body:
                  'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                belongs_to: 'Living in the shadow of a great man',
                created_by: 'butter_bridge',
                votes: 14,
                created_at: 1479818163389,
              },
              {
                body:
                  'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
                belongs_to: 'Living in the shadow of a great man',
                created_by: 'icellusedkars',
                votes: 100,
                created_at: 1448282163389,
              }]
            
            const output2 = [{
                body:
                  'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                belongs_to: 'Living in the shadow of a great man',
                created_by: 'butter_bridge',
                votes: 14,
                created_at: new Date (1479818163389)
              },
              {
                body:
                  'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
                belongs_to: 'Living in the shadow of a great man',
                created_by: 'icellusedkars',
                votes: 100,
                created_at: new Date (1448282163389)
              }]
            expect(commentsReformatter(test2)).to.eql(output2)
        });
    });

    describe('articleIDreformatter', () => {
        it('turns an article name into an article ID', () => {
             const commentsIn = [{
                body:
                  'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                belongs_to: 'Living in the shadow of a great man',
                created_by: 'butter_bridge',
                votes: 14,
                created_at: 1479818163389,
              }]

              const articlesRef = [{
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: new Date(1542284514171),
                votes: 100,}]
            
            const commentsOut = [{
                body:
                  'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                article_id: 1,
                author: 'butter_bridge',
                votes: 14,
                created_at: new Date(1479818163389),
              }]


            expect(articlesReformatter(commentsIn, articlesRef)).to.eql(commentsOut)
            
        });
        
    });
