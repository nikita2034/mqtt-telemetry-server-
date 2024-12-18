import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class BzpCommands extends Model {}

BzpCommands.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        terminal_15_ccs_to_ecu: DataTypes.STRING,
        turn_on_cabin_power: DataTypes.STRING,
        turn_on_headlights_power: DataTypes.STRING,
        turn_on_rear_lights_power: DataTypes.STRING,
        turn_on_air_dryer_power: DataTypes.STRING,
        turn_on_liquid_heater_power: DataTypes.STRING,
        turn_on_fuel_filter_preheater_coarse_filter: DataTypes.STRING,
        turn_on_fuel_filter_preheater_fine_filter: DataTypes.STRING,
        turn_on_trailer_power: DataTypes.STRING,
        turn_on_trailer_power_abs: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'BzpCommands',
        tableName: 'bzp_commands',
        timestamps: false,
    }
);

export default BzpCommands;
