import BatteryParameters from './battery_parameters';
import BzpCommands from './bzp_commands';
import DbkOutputs from './dbk_outputs';
import ElectricSystemParameters from './electric_system_parameters';
import Locations from './location';
import Package from './package';
import PowertrainSystemParameters from './powertrain_system_parameters';
import TransportAirConditioning from './transport_air_conditioning';
import TransportLighting from './transport_lighting';
import TransportsData from './transports_data';
import Transport from './transport'

export const getModelByName = (tableName: string) => {
    switch (tableName) {
        case 'battery_parameters':
            return BatteryParameters;
        case 'bzp_commands':
            return BzpCommands;
        case 'dbk_outputs':
            return DbkOutputs;
        case 'electric_system_parameters':
            return ElectricSystemParameters;
        case 'locations':
            return Locations;
        case 'package':
            return Package;
        case 'powertrain_system_parameters':
            return PowertrainSystemParameters;
        case 'transport_air_conditioning':
            return TransportAirConditioning;
        case 'transport_lighting':
            return TransportLighting;
        case 'transports_data':
            return TransportsData;
        case 'transports':
            return Transport;
        default:
            console.error(`No model found for table: ${tableName}`);
            return null;
    }
};
