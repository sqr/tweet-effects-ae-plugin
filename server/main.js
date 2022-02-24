require('dotenv').config({path: '../.env'})
const { TwitterApi } = require('twitter-api-v2');
const express = require('express')
const app = express()
const { processTweet } = require('./tweetController');
const { processUser } = require('./userController');



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/test', (req, res) => {
    res.json({ message: 'Welcome to the application 3002.' })
})


app.get('/tweet/:id', async (req, res) => {
    const { id } = req.params
    const tweet = await processTweet(id)
    res.json(tweet)
})

app.post('/tweet', async (req, res) => {
    console.log(req.body)
    const { id, location } = req.body
    // Example of location value: /i/huffpost/2022/febrero
    console.log(id)
    console.log(location)
    const tweet = await processTweet(id, location)
    res.json(tweet)
})

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const tweetOfId20 = async function () {
    const tweet = await client.v2.singleTweet('1494728226991710213', {
        "tweet.fields": ['created_at', 'attachments', 'public_metrics', 'source'],
        expansions: [
          'author_id',
          'entities.mentions.username',
          'in_reply_to_user_id',
        ],
    });
    console.log(tweet)
    console.log(tweet.includes.users)
}

const user = async function () {
    const luler = await client.v2.userByUsername('squaree', {
        'user.fields': ['profile_image_url']
    })
    console.log(luler)
}

const server = app.listen(3002, () => {
    const host = server.address().address
    const port = server.address().port

    console.log('Listening on %s port %s', host, port)
})