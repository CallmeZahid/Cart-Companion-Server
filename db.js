const mongoose = require('mongoose');

const connectToDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://hussain321zahid:MaHT8QYlGWAim23J@cluster0.mkfhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
          console.log('✅ Connected to Database');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error.message);
        process.exit(1);
    }
}

module.exports = {connectToDB};
