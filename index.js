const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use((req, res, next) => {
    res.locals.redditData = redditData;
    res.locals.currentPath = req.path; 
    next();
});

app.get('/', (req, res) => {
    res.render('home', { title: 'MiniReddit', redditData });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { title: data.name, ...data });
    } else {
        res.render('notfound', { title: 'Not Found', subreddit });
    }
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})