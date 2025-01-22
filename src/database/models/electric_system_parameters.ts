import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class ElectricSystemParameters extends Model {}

ElectricSystemParameters.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        power_consumption_hydraulic: {
            type: DataTypes.DECIMAL(10, 2),
        },
        power_consumption_air_compressor: {
            type: DataTypes.DECIMAL(10, 2),
        },
        power_consumption_dcdc: {
            type: DataTypes.DECIMAL(10, 2),
        },
        power_consumption_engine: {
            type: DataTypes.DECIMAL(10, 2),
        },
        main_power_on_relay_1_status:{
            type: DataTypes.DECIMAL(10, 2),
        },
        main_power_on_relay_2_status:{
            type: DataTypes.DECIMAL(10, 2),
        },
        enabling_transport_terminal_15:{
            type: DataTypes.STRING,       // Логическое значение        
        },
    },
    {
        sequelize,
        modelName: 'ElectricSystemParameters',
        tableName: 'electric_system_parameters',
        timestamps: false,
    }
);

export default ElectricSystemParameters;
