import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class Locations extends Model {}

Locations.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
        },
        longitude: {
            type: DataTypes.DOUBLE,
        },
        block_id: {
            type: DataTypes.STRING,
            references: {
                model: 'Transport',
                key: 'block_id'
            }
        },
        speed: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: 'Locations',
        tableName: 'locations',
        timestamps: false,
    }
);

export default Locations;
