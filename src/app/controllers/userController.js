const Sequelize = require('sequelize');
const { User } = require('../models/index');

exports.createUser = async (newUser) => {
    await User.create(newUser);
}   

exports.getUser = async () => {
    const users = await User.findAll();
    return users[0];
}

exports.editUser = async (update) => {
    const users = await User.findAll();
    const user = users[0]
    user.name = update.name;
    await user.save();
}