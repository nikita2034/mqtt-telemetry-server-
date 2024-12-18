import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class PowertrainSystemParameters extends Model {}

PowertrainSystemParameters.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        throttle_position: {
            type: DataTypes.DECIMAL(5, 2),
        },
        engine_torque: {
            type: DataTypes.DECIMAL(10, 2),
        },
        engine_rpm: {
            type: DataTypes.INTEGER,
        },
        gearbox_output_speed: {
            type: DataTypes.INTEGER,
        },
        transmission_status: {
            type: DataTypes.BOOLEAN,
        },
        vehicle_on: {
            type: DataTypes.BOOLEAN,
        },
        dcdc_on: {
            type: DataTypes.BOOLEAN,
        },
        battery_on: {
            type: DataTypes.BOOLEAN,
        },
        hydraulic_sensor_level: {
            type: DataTypes.STRING,
        },
        coolant_sensor_level: {
            type: DataTypes.STRING,
        },
        power_steering_on: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'PowertrainSystemParameters',
        tableName: 'powertrain_system_parameters',
        timestamps: false,
    }
);

export default PowertrainSystemParameters;
