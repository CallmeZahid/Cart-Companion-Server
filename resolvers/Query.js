const models = require('../models')
const {AuthenticationError} = require('apollo-server-express')

const Query = {
    getShoppingList: async(parent,{},{user})=>{
        if(!user) {
            throw new AuthenticationError('You must be signed in to get shopping list');
        }
        return models.Item.find({UserId:user.id});
    }
}

module.exports = Query;