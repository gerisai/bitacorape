const path = require('path');
const Sequelize = require('sequelize');
const UserModel = require('./user');
const LogModel = require('./log');

const sequelize = new Sequelize("sqlite:bitacora.sqlite", {logging: false});

const User = UserModel(sequelize,Sequelize);
const Log = LogModel(sequelize,Sequelize);

sequelize.sync()
.then(() => {
    console.log("Database & tables created!");
})
.catch(error => {
    console.log("Error creating the data base tables:",error)
    process.exit(1);
});

module.exports = {
    User,
    Log
}

