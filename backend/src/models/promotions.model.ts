import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { DataTypes } from "sequelize";

import { sequelize } from "../../config/db";

interface Promotions extends Model<
  InferAttributes<Promotions>,
  InferCreationAttributes<Promotions>
> {
  id: CreationOptional<number>;
  slug: string,
  name: string,
}

export const Promotions = sequelize.define<Promotions>("Promotions", {
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