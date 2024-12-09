const jwt =  require('jsonwebtoken');
const getUser = (token)=>{
    if(token) {
        try {
            return jwt.verify(token,process.env.JWT_SECRET_KEY);
        } catch (error) {
            throw new Error('Session Invalid');
        }
    }
}
module.exports = getUser;