const {dotenv} = require('dotenv');
const { GraphQLServer } = require('graphql-yoga');
const mongoose= require('mongoose');
const cors = require('cors');
const { get } = require('lodash');

const { mongoURI } = require('./config');
const typeDefs = require('./typeDef');
const resolvers = require('./resolver');

// require('dotenv').config({path:'graphql-server/.env'});
// console.log('this is env',dotenv);
//connect mongodb
// require('./models/user');
require('./models/group');
require('./models/messages');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
})
mongoose.connection.on('error', (err) => {
    console.log('error in connection to mongodb',err);
})


const server = new GraphQLServer({typeDefs, resolvers, context: req => {
    return {...req};
}});
server.start((port) => {
    console.log('server is running on port', port);
})

