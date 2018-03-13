'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('Users', {
        name: DataTypes.STRING(30),
        emailid: DataTypes.STRING(30),
        password: DataTypes.STRING(15),
        type_of_user: DataTypes.TINYINT(1)
    });
    return User;
};