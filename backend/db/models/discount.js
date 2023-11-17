
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        static associate(models) { }
    };

    Discount.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        applicableCategory: {
            type: DataTypes.STRING,
            defaultValue: "All"
        },
        discountName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discountType: {
            type: DataTypes.STRING,
            defaultValue: "percent",
        },
        discountValue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Discount'
    });
    return Discount;
};