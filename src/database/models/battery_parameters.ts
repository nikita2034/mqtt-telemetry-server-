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
            type: DataTypes.BOOLEAN,       // Логическое значение
            allowNull: true,                // Поле может быть NULL
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
