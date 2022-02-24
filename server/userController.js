require('dotenv').config({path: '../.env'})
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const download = require('image-downloader')

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function processUser(id, location) {
    const userInfo = await client.v2.user(id, {
        'user.fields': ['profile_image_url']
    })
    console.log(userInfo)
    return userInfo
}

async function storeUserAvatar(avatarUrl) {
    // Example avatarUrl
    // https://pbs.twimg.com/profile_images/1943597280/Ra_normal.jpg
    // Needs to be turned into
    // https://pbs.twimg.com/profile_images/1943597280/Ra_400x400.jpg
    const options = {
        url: 'https://pbs.twimg.com/profile_images/1943597280/Ra_400x400.jpg',
        dest: './'
    }
    try {
        await download.image(options)
        console.log('Image downloaded succesfully.')
    } catch (error) {
        console.error(`Error downloading image: ${error}`)
    }
}

storeUserAvatar()
module.exports = { processUser }