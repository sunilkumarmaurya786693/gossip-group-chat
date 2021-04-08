var { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id:Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
module.exports = schema;
