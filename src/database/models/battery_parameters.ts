import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class BatteryParameters extends Model {}

BatteryParameters.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true, // Автоинкремент
            primaryKey: true,     // Первичный ключ
            allowNull: false,     // Не может быть NULL
        },
        battery_min_temp: {
            type: DataTypes.DECIMAL(5, 2),  // Число с точностью до 2 знаков
            allowNull: true,                // Поле может быть NULL
        },
        battery_max_temp: {
            type: DataTypes.DECIMAL(5, 2),  // Число с точностью до 2 знаков
            allowNull: true,                // Поле может быть NULL
        },
        battery_soc: {
            type: DataTypes.DECIMAL(5, 2),  // Число с точностью до 2 знаков
            allowNull: true,                // Поле может быть NULL
        },
        battery_voltage: {
            type: DataTypes.DECIMAL(5, 2),  // Число с точностью до 2 знаков
            allowNull: true,                // Поле может быть NULL
        },
        battery_charging: {
            type: DataTypes.STRING,       // Логическое значение        
        },
        battery_activation_status:{
            type: DataTypes.STRING,       // Логическое значение        
        },
        min_battery_cell_voltage:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        max_battery_cell_voltage:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        battery_charge_error_counter:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        successful_battery_charging_counter:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        charging_error_battery_not_enabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        charging_error_dcdc_not_enabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        charging_error_battery_not_disabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        charging_error_dcdc_not_disabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        error_counter_battery_not_enabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        error_counter_dcdc_not_enabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        error_counter_battery_not_disabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        error_counter_dcdc_not_disabled:{
            type: DataTypes.DECIMAL(5, 2),       // Логическое значение        
        },
        charging_low_voltage_batteries:{
            type: DataTypes.STRING,       // Логическое значение        
        },
    },
    {
        sequelize,
        modelName: 'BatteryParameters',
        tableName: 'battery_parameters', 
        timestamps: false,              
    }
);

export default BatteryParameters;
