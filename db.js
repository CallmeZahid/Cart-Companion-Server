const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
          console.log('✅ Connected to Database');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error.message);
        process.exit(1);
    }
}

module.exports = {connectToDB};