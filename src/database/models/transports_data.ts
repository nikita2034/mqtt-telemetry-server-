import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class TransportsData extends Model {}

TransportsData.init(
    {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
        },
        id_bzp_commands: {
            type: DataTypes.BIGINT,
            references: {
                model: 'BzpCommands',
                key: 'id'
            }
        },
        id_dbk_outputs: {
            type: DataTypes.BIGINT,
            references: {
                model: 'DbkOutputs',
                key: 'id'
            }
        },
        id_el_syst_par: {
            type: DataTypes.BIGINT,
            references: {
                model: 'ElectricSystemParameters',
                key: 'id'
            }
        },
        id_battery_par: {
            type: DataTypes.BIGINT,
            references: {
                model: 'BatteryParameters',
                key: 'id'
            }
        },
        id_powertrain_sys_par: {
            type: DataTypes.BIGINT,
            references: {
                model: 'PowertrainSystemParameters',
                key: 'id'
            }
        },
        id_tr_air_conditions: {
            type: DataTypes.BIGINT,
            references: {
                model: 'TransportAirConditioning',
                key: 'id'
            }
        },
        id_tr_lighting: {
            type: DataTypes.BIGINT,
            references: {
                model: 'TransportLighting',
                key: 'id'
            }
        },
        block_id: {
            type: DataTypes.STRING,
            references: {
                model: 'Transport',
                key: 'block_id'
            }
        },
    },
    {
        sequelize,
        modelName: 'TransportsData',
        tableName: 'transports_data',
        timestamps: false,
    }
);

export default TransportsData;
