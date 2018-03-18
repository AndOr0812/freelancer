'use strict';

module.exports = function (sequelize, DataTypes) {
    var UserProfile = sequelize.define('UserProfile', {
        phone: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        aboutme: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgPath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        indexes: [
            // Creating Composite unique index on project id and bidder(user emailid)
            {
                unique: true,
                fields: ['emailId']
            }
        ]
    });

    UserProfile.associate = function (models) {
        UserProfile.belongsTo(models.User, {
            foreignKey: 'emailId',
            onDelete: 'CASCADE'
        });
    };

    return UserProfile;
};