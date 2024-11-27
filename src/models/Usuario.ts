// src/models/Usuario.ts
import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../instances/mysql'

export interface UsuarioInstance extends Model {
    id: number
    nome: string
    email: string
    senha: string
}

export const Usuario = sequelize.define<UsuarioInstance>("Usuario", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true
})