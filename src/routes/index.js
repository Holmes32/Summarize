// const RouterSite = require('./Site')
const RouterSummarize = require('./summarize')
const RouterTraining = require('./training')
const RouterDataset = require('./dataset')
function route(app){
    app.use('/',RouterSummarize)
    app.use('/summarize',RouterSummarize)
    app.use('/training',RouterTraining)
    app.use('/dataset',RouterDataset)
}

module.exports = route 