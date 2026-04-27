import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { DataTypes } from "sequelize";

import { sequelize } from "../../config/db";

interface Specialities extends Model<
  InferAttributes<Specialities>,
  InferCreationAttributes<Specialities>
> {
  id: CreationOptional<number>;
  slug: string,
  name: string,
}

export const Specialities = sequelize.define<Specialities>("Specialities", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});