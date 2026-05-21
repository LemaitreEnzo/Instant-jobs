import { sequelize } from "config/db";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

interface SubSpecialities extends Model<InferAttributes<SubSpecialities>, InferCreationAttributes<SubSpecialities>> {
    id: CreationOptional<number>;
    name: string;
    slug: string;
    specialityId: number;
}

export const SubSpecialities = sequelize.define<SubSpecialities>('SubSpecialities', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    slug: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
    },
    specialityId: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
});