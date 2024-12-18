import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class Package extends Model {}

Package.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        package: {
            type: DataTypes.STRING(150),
        },
    },
    {
        sequelize,
        modelName: 'Package',
        tableName: 'package',
        timestamps: false,
    }
);

export default Package;
