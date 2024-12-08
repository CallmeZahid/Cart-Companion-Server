const express = require('express')
require('dotenv').config();
const {connectToDB} = require('./db');
const {ApolloServer} = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./schema')

connectToDB();
const port = process.env.PORT || 3000;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
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
