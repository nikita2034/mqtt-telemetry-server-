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
        id_electric_system_parameters: {
            type: DataTypes.BIGINT,
            references: {
                model: 'ElectricSystemParameters',
                key: 'id'
            }
        },
        id_battery_parameters: {
            type: DataTypes.BIGINT,
            references: {
                model: 'BatteryParameters',
                key: 'id'
            }
        },
        id_powertrain_system_parameters: {
            type: DataTypes.BIGINT,
            references: {
                model: 'PowertrainSystemParameters',
                key: 'id'
            }
        },
        id_transport_air_conditioning: {
            type: DataTypes.BIGINT,
            references: {
                model: 'TransportAirConditioning',
                key: 'id'
            }
        },
        id_transport_lighting: {
            type: DataTypes.BIGINT,
            references: {
                model: 'TransportLighting',
                key: 'id'
            }
        },
        id_transport: {
            type: DataTypes.STRING,
            references: {
                model: 'Transport',
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
