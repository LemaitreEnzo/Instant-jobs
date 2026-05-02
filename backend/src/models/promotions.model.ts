import { sequelize } from "config/db";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface Promotions extends Model<InferAttributes<Promotions>, InferCreationAttributes<Promotions>>{
    id: CreationOptional<number>;
    name: string;
    slug: string;
    organisation_id: number;
}

export const Promotions = sequelize.define<Promotions>("Promotions", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});