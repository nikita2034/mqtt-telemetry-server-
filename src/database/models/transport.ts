import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { TransportAttributes } from '../../types/TransportAttributes';


// Интерфейс для создания модели (включает атрибуты, которые могут быть не заданы)
interface TransportCreationAttributes extends Optional<TransportAttributes,   'received_count'> {}

// Определение модели
class Transport extends Model<TransportAttributes, TransportCreationAttributes> implements TransportAttributes {
    public vin!: string;
    public model?: string;
    public year_release?: string;
    public vehicle_type_id?: number;
    public engine_type_id?: number;
    public organization_id?: number;
    public block_id?: string;
    public is_archived?: boolean;
    public received_count?: number;
}
    Transport.init(
        {
            vin: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },
            model: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            year_release: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            id_vehicle_type: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_engine_type: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            id_organization: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            block_id: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            is_archived: {
                type: DataTypes.STRING(20),
                allowNull: true,
                defaultValue: false,
            },
            received_count: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: 'transports',
            timestamps: false,
        }
    );
export default Transport;