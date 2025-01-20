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
        },
        latitude: {
            type: DataTypes.DOUBLE,
        },
        longitude: {
            type: DataTypes.DOUBLE,
        },
        id_transport: {
            type: DataTypes.STRING,
            references: {
                model: 'Transport',
                key: 'id'
            }
        },
        // block_id: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Transport',
        //         key: 'block_id'
        //     }
        // },
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
