const {DataTypes} = require('sequelize')
const connection = require('../config/core')


const TODO = connection.define('todolist',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    complete:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = TODO