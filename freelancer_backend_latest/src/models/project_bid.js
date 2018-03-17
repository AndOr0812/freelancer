'use strict';

module.exports = (sequelize, DataTypes) => {
    var ProjectBid = sequelize.define('ProjectBid', {
        bid: {type: DataTypes.INTEGER(7), allowNull: false},
        deliver_in_date : {type: DataTypes.INTEGER(4),allowNull: false},
        bid_status: {type: DataTypes.STRING(30)}
    });

    ProjectBid.associate = function (models) {
        ProjectBid.belongsTo(models.User, {
            foreignKey: 'Bidder',
            onDelete: 'SET NULL'
        });

        ProjectBid.belongsTo(models.Project, {
            foreignKey: 'ProjectId',
            onDelete: 'SET NULL'
        });
    }

    return ProjectBid;
};