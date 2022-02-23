require('dotenv').config({path: '../.env'})
const { TwitterApi } = require('twitter-api-v2');
const { processUser } = require('./userController');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function processTweet(id) {
    const tweet = await client.v2.singleTweet(id, {
        "tweet.fields": ['created_at', 'attachments', 'public_metrics', 'source'],
        expansions: [
          'author_id',
          'entities.mentions.username',
          'in_reply_to_user_id',
        ],
    });
    console.log(tweet)
    const user = await processUser(tweet.data.author_id)
    return user
}

function validateId(id) {
    return id
}

module.exports = { processTweet }