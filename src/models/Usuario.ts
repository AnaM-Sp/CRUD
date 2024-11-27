import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../instances/mysql'
import bcrypt from 'bcryptjs'
 

export class UsuarioInstance extends Model {
    public id!: number;
    public nome!: string;
    public senha!: string; // Senha criptografada
}



export const Usuario = sequelize.define<UsuarioInstance>("Usuario,",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName:'usuarios',
    timestamps:false
})