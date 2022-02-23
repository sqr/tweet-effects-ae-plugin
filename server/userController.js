require('dotenv').config({path: '../.env'})
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function processUser(id) {
    const userInfo = await client.v2.user(id, {
        'user.fields': ['profile_image_url']
    })
    console.log(userInfo)
    return userInfo
}

function saveAvatar(avatarUrl) {

}
module.exports = { processUser }