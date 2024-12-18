import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class DbkOutputs extends Model {}

DbkOutputs.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        running_light_command: DataTypes.STRING,
        alternate_beam_head_light_command: DataTypes.STRING,
        low_beam_head_light_command: DataTypes.STRING,
        high_beam_head_light_command: DataTypes.STRING,
        tractor_front_fog_lights_command: DataTypes.STRING,
        rotating_beacon_light_command: DataTypes.STRING,
        right_turn_signal_lights_command: DataTypes.STRING,
        left_turn_signal_lights_command: DataTypes.STRING,
        center_stop_light_command: DataTypes.STRING,
        right_stop_light_command: DataTypes.STRING,
        left_stop_light_command: DataTypes.STRING,
        implement_clearance_light_command: DataTypes.STRING,
        tractor_side_low_mounted_work_lights_command: DataTypes.STRING,
        implement_oem_option_1_light_command: DataTypes.STRING,
        implement_right_facing_work_light_command: DataTypes.STRING,
        implement_left_facing_work_light_command: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'DbkOutputs',
        tableName: 'dbk_outputs',
        timestamps: false,
    }
);

export default DbkOutputs;
