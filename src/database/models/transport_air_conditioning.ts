import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class TransportAirConditioning extends Model {}

TransportAirConditioning.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        ac_on: {
            type: DataTypes.STRING,
        },
        frost_sensor: {
            type: DataTypes.STRING,
        },
        pressure_sensor_on: {
            type: DataTypes.STRING,
        },
        outside_air_temp_sensor: {
            type: DataTypes.DECIMAL,
        },
        air_damper_position: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'TransportAirConditioning',
        tableName: 'transport_air_conditioning',
        timestamps: false,
    }
);

export default TransportAirConditioning;
