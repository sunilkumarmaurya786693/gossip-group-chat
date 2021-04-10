var express = require('express');
const mongoose= require('mongoose');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./typeDef');
const resolver = require('./resolver');
const { mongoURI } = require('./keys');
const PORT=4001;

//connect mongodb
require('./models/user');
require('./models/group');
require('./models/messages');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
})
mongoose.connection.on('error', (err) => {
    console.log('error in connection to mongodb',err);
})
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));
app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
