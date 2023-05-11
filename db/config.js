const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la BD');
    }
};

module.exports = {
    dbConection
};