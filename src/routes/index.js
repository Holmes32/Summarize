// const RouterSite = require('./Site')
const RouterSummarize = require('./summarize')
const RouterTraining = require('./training')
function route(app){
    app.use('/',RouterSummarize)
    app.use('/summarize',RouterSummarize)
    app.use('/training',RouterTraining)
}

module.exports = route 