'use strict';

import models from '../models';


module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name: DataTypes.STRING(30),
        emailId: {type: DataTypes.STRING(30), isEmail: true, primaryKey: true},
        password: DataTypes.STRING(15),
        typeOfUser: DataTypes.TINYINT(1)
    });

    User.associate = function (models) {
        User.hasMany(models.Project, {
            foreignKey: 'Employer',
            onDelete: 'CASCADE'
        });
        User.hasMany(models.ProjectBid, {
            foreignKey: 'Bidder',
            onDelete: 'SET NULL',
        });
    }

    return User;
};