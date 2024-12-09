const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ForbiddenError,AuthenticationError} = require('apollo-server-express')
const { default: mongoose } = require('mongoose')

const Mutation = {
    signUp: async (parent, { username, email, password }) => {
        email = email.trim().toLowerCase();
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await models.User.create({
                username,
                email,
                password: hashedPassword,
            });
            return jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.log(error);
            throw new Error('error creating account');
        }
    },
    signIn: async (parent, { username, email, password }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            throw new AuthenticationError('error signing in');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('error signing in');
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    },

    addItem : async(parent, {name,quantity,category},{user}) =>{
        if (!user) {
            throw new AuthenticationError('You must be signed in to add item to list');
        }
        const newItem = await models.Item.create({
            name,
            quantity,
            category,
            UserId : new mongoose.Types.ObjectId(user.id)
        });
        return newItem;
    },

    updateItem : async(parent,{id, name, quantity, category, purchased},{user})=>{
        if (!user) {
            throw new AuthenticationError('You must be signed in to update item');
        }
        try {
            const item = await models.Item.findById(id);
            if(item && String(item.UserId) !== user.id ){
                throw new ForbiddenError("You don't have permissions to update the item");
            }
            //no need to check if properties are defined ,set don't update with name:undefined
            const updatedItem = await models.Item.findByIdAndUpdate(id, { $set: { name,quantity,category,purchased } }, { new: true });
            return updatedItem;
        } catch (error) {
            throw new Error(error.message || 'Error updating Item');
        }
    },
    deleteItem: async(parent,{id},{user})=>{
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete item');
        }
        try {
            const item = await models.Item.findById(id);
            if(item && String(item.UserId) !== user.id ){
                throw new ForbiddenError("You don't have permissions to delete the item");
            }
            await item.deleteOne();
            return true;
        } catch (error) {
            return false;
        }
    }

    
}

module.exports = Mutation;