module.exports = (sequelize,type) => {
    return sequelize.define('user', {
        name: type.STRING
    });
}