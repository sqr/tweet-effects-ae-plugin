require('dotenv').config({path: '../.env'})
const { TwitterApi } = require('twitter-api-v2');
const { processUser } = require('./userController');
const fs = require('fs/promises');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function processTweet(id, location) {
    try {
        const tweet = await client.v2.singleTweet(id, {
            "tweet.fields": ['created_at', 'attachments', 'public_metrics', 'source'],
            expansions: [
              'author_id',
              'entities.mentions.username',
              'in_reply_to_user_id',
            ],
        });
        console.log(tweet)
    } catch (error) {
        console.error('Error fetching tweet:', error.message);
    }

    try {
        const user = await processUser(tweet.data.author_id, location)
    } catch (error) {
        console.error('Error fetching user:', error.message);
    }
    return user
}

function validateId(id) {
    return id
}

async function createDirectory(id, location) {
    try {
        // TO-DO
        // Turn this /i/huffpost/2022/febrero
        // into this I:/huffpost/2022/febrero/
        //
        // Directory should be /username_tweetid
        //
        await fs.mkdir('I:/huffpost/2022/febrero/tmp');
        console.log('successfully created /tmp/hello');
      } catch (error) {
        console.error('there was an error:', error.message);
      }
}

async function storeTweetData() {
    const user = {
        "id": 1,
        "name": "John Doe",
        "age": 32
    }

    const data = JSON.stringify(user)

    try {
        await fs.writeFile('data.json', data)
        console.log('JSON data stored locally')
    } catch (error) {
        console.error(`Error storing tweet data locally: ${error}`)
    }

}

function storeTweetMedia() {

}

storeTweetData()

module.exports = { processTweet }