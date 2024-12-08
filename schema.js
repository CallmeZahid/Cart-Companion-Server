const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Item { 
        id: ID! 
        name: String! 
        quantity: Int 
        category: String 
        purchased: Boolean 
    } 
    type User { 
        id: ID! 
        username: String! 
        email: String! 
        token: String 
    } 
    type Query { 
        getShoppingList(userId: ID!): [Item!] 
    } 
    type Mutation { 
        addItem(name: String!, quantity: Int!, category: String!):Item 
        updateItem(id: ID!, name: String, quantity: Int, category: String, purchased: Boolean): Item 
        deleteItem(id: ID!): Boolean 
    }
`;

module.exports = typeDefs;