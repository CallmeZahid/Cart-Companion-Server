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
    } 
    type Query { 
        getShoppingList: [Item!] 
    } 
    type Mutation { 
        addItem(name: String!, quantity: Int!, category: String!):Item 
        updateItem(id: ID!, name: String, quantity: Int, category: String, purchased: Boolean): Item 
        deleteItem(id: ID!): Boolean 
        signIn(username:String!,email:String!,password:String!):String!
        signUp(username:String!,email:String!,password:String!):String!
    }
`;

module.exports = typeDefs;