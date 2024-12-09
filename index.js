const express = require('express')
require('dotenv').config();
const {connectToDB} = require('./db');
const {ApolloServer} = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./schema')
const getUser =  require('./utils/getUser')
const cors = require('cors');
const helmet = require('helmet')
const depthLimit = require('graphql-depth-limit')
const {createComplexityLimitRule} = require('graphql-validation-complexity')



connectToDB();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token = req.headers.authorization;
        const user = getUser(token);
        return {user};
    },
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
});

app.get('/',(req,res)=>{
    res.send('Hello World');
})

server.start().then(()=>{
    server.applyMiddleware({ app, path: '/api' });
    app.listen(port,()=>{
        console.log(`server is listening at http://localhost:${port}${server.graphqlPath}`);
    })
})
