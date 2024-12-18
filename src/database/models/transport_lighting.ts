import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class TransportLighting extends Model {}

TransportLighting.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        daytime_running_lights: {
            type: DataTypes.STRING,
        },
        low_beam: {
            type: DataTypes.STRING,
        },
        high_beam: {
            type: DataTypes.STRING,
        },
        front_log_lights: {
            type: DataTypes.STRING,
        },
        right_turn_signal: {
            type: DataTypes.STRING,
        },
        left_turn_signal: {
            type: DataTypes.STRING,
        },
        side_maker_lights: {
            type: DataTypes.STRING,
        },
        rear_fog_lights: {
            type: DataTypes.STRING,
        },
        reverse_lights: {
            type: DataTypes.STRING,
        },
        right_brake_lights: {
            type: DataTypes.STRING,
        },
        left_brake_lights: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'TransportLighting',
        tableName: 'transport_lighting',
        timestamps: false,
    }
);

export default TransportLighting;
