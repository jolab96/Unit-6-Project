// setting variables for dependencies

const express = require('express')
const app = express()
const port = 3000
const data = require('./data/data.json')
const projects = data.projects


app.use('/static', express.static('public'))
app.set('view engine', 'pug') // setting engine to "pug"



app.get('/', (req, res) => {
    res.render('index', { projects: data.projects })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const { id } = req.params // requiring paramaters of the id in data.json
    const project = projects[id] // defining project
    res.render('project', { project })
})

// function displaying error message 

app.use((req, res, next) => {
    const err = new Error('This page is not found!')
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status)
    res.render('error');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
