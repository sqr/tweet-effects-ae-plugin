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
        const authorUsername = tweet.includes.users[0].username
        const tweetDir = await createDirectory(id, authorUsername, location)
        await storeTweetData(id, tweet, tweetDir)
        const user = await processUser(tweet.data.author_id, location)
        return user
    } catch (error) {
        console.error('Error processing tweet:', error.message);
        return error
    }
}

function validateId(id) {
    return id
}

async function createDirectory(id, username, location) {
    const dir = directoryTransform(location)
    const dirAppend = `${username}_${id}`
    const tweetDir = `${dir}/${dirAppend}`
    try {
        await fs.mkdir(tweetDir);
        console.log(`Successfully created ${tweetDir}`);
        return tweetDir
      } catch (error) {
        console.error('there was an error:', error.message);
      }
}

async function storeTweetData(id, tweet, tweetDir) {
    const exampleData = {
    "tweetData": {
        "username": "Arturo Bracero",
        "handle": "@squaree",
        "tweet-text": "Texto de tweet de prueba. Maximo 280 characters",
        "retweet": "1233",
        "replies": "2423",
        "likes": "3920",
        "source": "Twitter para iPhone",
        "created-at": "22 de febrero de 2022"
        },
    "userData": {
        }
    }
    const data = JSON.stringify(tweet)

    try {
        await fs.writeFile(`${tweetDir}/data.json`, data)
        console.log('JSON data stored locally')
    } catch (error) {
        console.error(`Error storing tweet data locally: ${error}`)
    }
}

function storeTweetMedia() {

}

function directoryTransform(location) {
    const separator = '/'
    const dirArray = location.split('/')
    dirArray[1] += ':'
    dirArray.shift()
    const dir = dirArray.join(separator)
    console.log(dir)

    return dir
}

//createDirectory('1231233', 'lollerman', '/i/huffpost/2022/febrero')
//storeTweetData('1231233','i:/huffpost/2022/febrero/lollerman_1231233')

processTweet('1497176346744979458', '/i/huffpost/2022/febrero')

module.exports = { processTweet }