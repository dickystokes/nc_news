const { expect } = require('chai')
const {articlesReformatter} = require('../db/utils/date-reformatter')

const {
    topicsData,
    usersData,
    articlesData,
    commentsData
  } = require("../db/data/index");

    describe('articles reformatter', () => {
        
        it('returns an array of objects in the correct format for seed length 1', () => {
            const test1 = [{ title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100 }]
            
            const output1 = [{ title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: new Date(1542284514171),
            votes: 100 }]
            expect(articlesReformatter(test1)).to.eql(output1)
        })

        it('returns an array of objects in the correct format for seed for any length', () => {
            const test2 = [{
                title: 'Sony Vaio; or, The Laptop',
                topic: 'mitch',
                author: 'icellusedkars',
                body:
                  'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                created_at: 1416140514171,
              },
              {
                title: 'Eight pug gifs that remind me of mitch',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'some gifs',
                created_at: 1289996514171,
              },]
            
            const output2 = [{
                title: 'Sony Vaio; or, The Laptop',
                topic: 'mitch',
                author: 'icellusedkars',
                body:
                  'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                created_at: new Date(1416140514171),
              },
              {
                title: 'Eight pug gifs that remind me of mitch',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'some gifs',
                created_at: new Date(1289996514171),
              },]
            expect(articlesReformatter(test2)).to.eql(output2)
        })


    });
