'use strict';

module.exports = (sequelize, DataTypes) => {
    var Project = sequelize.define('Project', {
        proj_name: {type: DataTypes.STRING(30), allowNull: false},
        proj_desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: {
                args: [100, 1000],
                msg: "Description should be of length 100 to 1000 chars"
            }
        },
        skills: {type: DataTypes.STRING, allowNull: false},
        budget_currency: {type: DataTypes.STRING(3), allowNull: false},
        budget_range: {type: DataTypes.STRING(30), allowNull: false}
    });

    Project.associate = function (models) {
        Project.belongsTo(models.User, {
            foreignKey: 'Employer',
            onDelete: 'CASCADE'
        });
        Project.hasMany(models.ProjectBid, {
            foreignKey: 'ProjectId',
            onDelete: 'SET NULL'
        });

        Project.hasMany(models.ProjectBid, {
            foreignKey: 'EmployerID',
            sourceKey: 'Employer',
            onDelete: 'SET NULL'
        });
    };
        return Project;
};