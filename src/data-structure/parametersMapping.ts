import { ParameterMapping } from "../types/DataSessionMessage";
const parametersMapping: ParameterMapping[] = [
    {
        id: '0CF7121D',   
        positions: [
            {
                name: 'enabling_transport_terminal_15',  //Включение транспорта по клеме 15
                byte: [3],
                bits: [0,1],
                table: 'electric_system_parameters',
                field: 'enabling_transport_terminal_15',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
    {
        id: '18F758F4',   
        positions: [
            {
                name: 'battery_activation_status',  //Включение батарей
                byte: [0],
                bits: [0,1],
                table: 'battery_parameters',
                field: 'battery_activation_status',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
    {
        id: '18F75FF4',   
        positions: [
            {
                name: 'min_battery_cell_voltage',  //минимальное напряжение ячеек батарй
                byte: [0,1],
                table: 'battery_parameters',
                field: 'min_battery_cell_voltage',
                coefficient: 0.001,
                offset: 0
            },
            {
                name: 'max_battery_cell_voltage',  //максимальное напряжение ячеек батарй
                byte: [4,5],
                table: 'battery_parameters',
                field: 'max_battery_cell_voltage',
                coefficient:  0.001,
                offset: 0
            }
        ]
    },
    {
        id: '18FF42CF',   
        positions: [
            {
                name: 'battery_charge_error_counter',  //счетчик ошибочных зарядок батарей
                byte: [6],
                table: 'battery_parameters',
                field: 'battery_charge_error_counter',
                coefficient: 1,
                offset: 0
            },
            {
                name: 'successful_battery_charging_counter ',  //счетчик успешных зарядок батарей
                byte: [7],
                table: 'battery_parameters',
                field: 'successful_battery_charging_counter ',
                coefficient:  1,
                offset: 0
            }
        ]
    },
    {
        id: '18FF41CF',   
        positions: [
            {
                name: 'charging_error_battery_not_enabled',  //ошибка из-за того, что батарея не была включена.
                byte: [0],
                bits: [0,1],
                table: 'battery_parameters',
                field: 'charging_error_battery_not_enabled',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'charging_error_dcdc_not_enabled',  //ошибка из-за того, что DC-DC преобразователь не был включен.
                byte: [0],
                bits: [2,3],
                table: 'battery_parameters',
                field: 'charging_error_dcdc_not_enabled',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'charging_error_battery_not_disabled',  // ошибка из-за того, что DC-DC преобразователь не был выключен..
                byte: [0],
                bits: [4,5],
                table: 'battery_parameters',
                field: 'charging_error_battery_not_disabled',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'charging_error_dcdc_not_disabled',  //счетчик успешных зарядок батарей счетчик ошибок из-за того, что батарея не была включена.
                byte: [0],
                bits: [6,7],
                table: 'battery_parameters',
                field: 'charging_error_dcdc_not_disabled',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'error_counter_battery_not_enabled',  //счетчик ошибок из-за того, что DC-DC преобразователь не был включен.
                byte: [1],
                table: 'battery_parameters',
                field: 'error_counter_battery_not_enabled',
                coefficient:  1,
                offset: 0
            },
            {
                name: 'error_counter_dcdc_not_enabled',  //счетчик ошибок из-за того, что батарея не была выключена.
                byte: [2],
                table: 'battery_parameters',
                field: 'error_counter_dcdc_not_enabled',
                coefficient:  1,
                offset: 0
            },
            {
                name: 'error_counter_battery_not_disabled',  //счетчик ошибок из-за того, что DC-DC преобразователь не был выключен.
                byte: [3],
                table: 'battery_parameters',
                field: 'error_counter_battery_not_disabled',
                coefficient:  1,
                offset: 0
            },
            {
                name: 'error_counter_dcdc_not_disabled',  //счетчик успешных зарядок батарей
                byte: [4],
                table: 'battery_parameters',
                field: 'error_counter_dcdc_not_disabled',
                coefficient:  1,
                offset: 0
            },
            {
                name: 'charging_low_voltage_batteries ',  //счетчик успешных зарядок батарей
                byte: [6],
                bits: [0, 1],
                table: 'battery_parameters',
                field: 'charging_low_voltage_batteries ',
                mapping: {
                    2: 'off',
                    1: 'on',
                }
            },
        ]
    },
    {
        id: '18FEF31C',   
        positions: [
            {
                name: 'latitude',  //Широта
                byte: [3,2,1,0],
                table: 'locations',
                field: 'latitude',
                coefficient: 0.0000001,
                offset: -210
            },
            {
                name: 'longitude',  //Долгота
                byte: [7,6,5,4],
                table: 'locations',
                field: 'longitude',
                coefficient: 0.0000001,
                offset: -210
            }
        ]
    },
    {
        id: '18FEE81C',   
        positions: [
            {
                name: 'speed',  //Скорость
                byte: [2,3],
                table: 'locations',
                field: 'speed',
                coefficient: 0.00390625,
                offset: 0
            }
        ]
    },
  
    {
        id: '18F003AD',   
        positions: [
            {
                name: 'accelerator_moment',  //момент с педали акселератора
                byte: [1],
                table: 'powertrain_system_parameters',
                field: 'accelerator_moment',
                coefficient: 0.4,
                offset: 0
            }
        ]
    },
    {
        id: '142FFF95',
        positions: [
            {
                name: 'gur_power_consumption', // расход энергии gur
                byte: [4],
                table: 'electric_system_parameters',
                field: 'power_consumption_hydraulic',
                coefficient: 1,
                offset: 0
            },
            {
                name: 'power_steering_on',  // включение ГУР
                byte: [6],
                bits: [4, 5],
                table: 'powertrain_system_parameters',
                field: 'power_steering_on',
                mapping: {
                    0: 'stopped',
                    1: 'running',
                    2: 'error'
                }
            }
        ]
    },
    {
        id: '18F70F19',
        positions: [
            {
                name: 'ac_on', //включение кондиционера (команда на включение)
                byte: [1],
                bits: [4, 5],
                table: 'transport_air_conditioning',
                field: 'ac_on',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
    {
        id: '1429FF9B',
        positions: [
            {
                name: 'power_consumption_air_compressor', //расход энергии air_compressor
                byte: [4],
                table: 'electric_system_parameters',
                field: 'power_consumption_air_compressor',
                coefficient: 1,
                offset: 0
            }
        ]
    },
    {
        id: '18F760F4',
        positions: [
            {
                name: 'battery_min_temp', //критическое значение температуры ячеек, заряд мин
                byte: [0],
                table: 'battery_parameters',
                field: 'critical_temperature_min',
                coefficient: 1,
                offset: 0
            },
            {
                name: 'battery_max_temp', //критическое значение температуры ячеек, заряд макс
                byte: [3],
                table: 'battery_parameters',
                field: 'critical_temperature_max',
                coefficient: 1,
                offset: 0
            }
        ]
    },
    {
        id: '18F759F4',
        positions: [
            {
                name: 'battery_soc',  //SOC
                byte: [5,6],
                table: 'battery_parameters',
                field: 'battery_soc',
                coefficient: 0.1,
                offset: 1
            },
            {
                name: 'power_consumption_all', //расход энергии all_current
                byte: [2,3],
                table: 'electric_system_parameters',
                field: 'power_consumption_all',
                coefficient: 0.1,
                offset: 1000
            }
        ]
    },
    {
        id: '18FF2DF4',
        positions: [
            {
                name: 'dcdc_on', //включение dcdc
                byte: [0],
                bits: [0, 1, 2, 3],
                table: 'powertrain_system_parameters',
                field: 'dcdc_on',
                mapping: {
                    1: 'ready',
                    2: 'started',
                    3: 'stopped',
                    4: 'error'
                }
            },
            {
                name: 'power_consumption_dcdc',//расход энергии dcdc
                byte: [1,2],
                table: 'electric_system_parameters',
                field: 'power_consumption_dcdc',
                coefficient: 0.1,
                offset: 0
            }
        ]
    },
    {
        id: '0CFDCD4D',
        positions: [
            {
                name: 'battery_voltage', //напряжение низковольтных батарей
                byte: [6, 7],
                table: 'battery_parameters',
                field: 'battery_voltage',
                coefficient: 0.1,
                offset: 0
            },
            {
                name: 'hydraulic_sensor_level', // датчик уровня ГУР
                byte: [4],
                bits: [0, 1],
                table: 'powertrain_system_parameters',
                field: 'hydraulic_sensor_level',
                mapping: {
                    0: 'oil_present', 
                    1: 'no_oil',   
                }
            },
            {
                name: 'coolant_sensor_level', // датчик уровня ОЖ
                byte: [4],
                bits: [2, 3],
                table: 'powertrain_system_parameters',
                field: 'coolant_sensor_level',
                mapping: {
                    1: 'liquid_present',
                    0: 'no_liquid'
                }
            },
            {
                name: 'frost_sensor',  //включение датчика обморожения кондиционера
                byte: [4],
                bits: [4, 5],
                table: 'transport_air_conditioning',
                field: 'frost_sensor',
                mapping: {
                    0: 'needs_to_be_turned_off',
                    1: 'turn_on',
                }
            },
        ]
    },
    {
        id: '18F5D003',
        positions: [
            {
                name: 'power_consumption_engine',//расход энергии motor
                byte: [0, 1],
                table: 'electric_system_parameters',
                field: 'power_consumption_engine',
                coefficient: 0.1,
                offset: -1000
            }
        ]
    },
    {
        id: '18F2D003',
        positions: [
            {
                name: 'engine_torque', //момент двигателя
                byte: [2, 3],
                table: 'powertrain_system_parameters',
                field: 'engine_torque',
                coefficient: 1,
                offset: -5000
            },
            {
                name: 'engine_rpm', //обороты на двигатиле
                byte: [0, 1],
                table: 'powertrain_system_parameters',
                field: 'engine_rpm',
                coefficient: 1,
                offset: -15000
            }
        ]
    },
    {
        id: '18FEF559',
        positions: [
            {
                name: 'outside_air_temp_sensor', //ДТ наружного воздуха
                byte: [3, 4],
                table: 'transport_air_conditioning',
                field: 'outside_air_temp_sensor',
                coefficient: 0.03125,
                offset: -273
            }
        ]
    },

    {
        id: '0CFFD003',
        positions: [
            {
                name: 'transmission_status', // включенная передача
                byte: [0],
                bits: [0, 1, 2, 3],
                table: 'powertrain_system_parameters',
                field: 'transmission_status',
                mapping: {
                    0: "Neutral (N)",
                    1: "Reverse (R)",
                    2: "Drive 1 (D1)",
                    3: "Drive 2 (D2)",
                    4: "Drive 3 (D3)",
                    5: "Drive 4 (D4)",
                    6: "Drive 5 (D5)",
                }
            }
        ]
    },
    {
        id: '08F7131E',
        positions: [
            {
                name: 'on_off', //включение выключение
                byte: [0],
                bits: [1,2,3,4],
                table: 'powertrain_system_parameters', 
                field: 'on_off',             
                mapping: {
                    0: 'off',
                    1: 'on',
                    2: 'disconnected'
                }
            }
        ]
    },
    {
        id: '18F7103A',
        positions: [
            {
                name: 'air_damper_position', //включение датчика давления кондиционера
                byte: [0],
                bits: [0, 1, 2, 3],
                table: 'transport_air_conditioning',
                field: 'air_damper_position',
                mapping: {
                    0: 'windshield',
                    1: 'central',
                    2: 'upper-centra'
                }
            }
        ]
    },
    {
        id: '18F75EF4',
        positions: [
            {
                name: 'main_power_on_relay_1_status',  //состояние основного реле включения питания 1
                byte: [0],
                bits: [0],
                table: 'electric_system_parameters',
                field: 'main_power_on_relay_1_status',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'main_power_on_relay_2_status',  //состояние основного реле включения питания 2
                byte: [0],
                bits: [3],
                table: 'electric_system_parameters',
                field: 'main_power_on_relay_2_status',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
    {
        id: '18F75AF4',
        positions: [
            {
                name: 'battery_charging', //зарядка батарей
                byte: [0],
                bits: [6, 7],
                table: 'battery_parameters',
                field: 'battery_charging',
                mapping: {
                    0: 'not charging',
                    1: 'charging',
                    2: 'completed'
                }
            },
        ]
    },
   
    {
        id: 'XXFE414D',   // указать XX СВЕТ
        positions: [
            {
                name: 'daytime_running_lights',  //ДХО
                byte: [0],
                bits: [0, 1],
                table: 'transport_lighting',
                field: 'daytime_running_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'low_beam',  //ближний свет
                byte: [0],
                bits: [4],
                table: 'transport_lighting',
                field: 'low_beam',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'high_beam',  //дальний свет
                byte: [0],
                bits: [6],
                table: 'transport_lighting',
                field: 'high_beam',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'front_log_lights',  //передняя ПТФ
                byte: [1],
                bits: [0],
                table: 'transport_lighting',
                field: 'front_log_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'right_turn_signal',  //сигнализация ПРАВ поворотов
                byte: [1],
                bits: [4],
                table: 'transport_lighting',
                field: 'right_turn_signal',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'left_turn_signal',  //сигнализация ЛЕВ поворотов
                byte: [1],
                bits: [6],
                table: 'transport_lighting',
                field: 'left_turn_signal',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'side_maker_lights',  //габаритные фонари
                byte: [3],
                bits: [6],
                table: 'transport_lighting',
                field: 'side_maker_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'rear_fog_lights',  //задняя ПТФ
                byte: [4],
                bits: [0],
                table: 'transport_lighting',
                field: 'rear_fog_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'reverse_lights',  //задний ход
                byte: [2],
                bits: [0],
                table: 'transport_lighting',
                field: 'reverse_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'right_brake_lights',  //стоп сигналы прав
                byte: [2],
                bits: [4],
                table: 'transport_lighting',
                field: 'right_brake_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'left_brake_lights',  //стоп сигналы лев
                byte: [2],
                bits: [6],
                table: 'transport_lighting',
                field: 'left_brake_lights',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
        ]
    },
    {
        id: '0CF7121D',
        positions: [
            {
                name: 'terminal_15_ccs_to_ecu', //Клемма 15 ЦКБ К ЭБУ
                byte: [0],
                bits: [0, 1],
                table: 'bzp_commands',
                field: 'terminal_15_ccs_to_ecu',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_cabin_power', //Включить питание кабины (Кл. 15)
                byte: [0],
                bits: [2, 3],
                table: 'bzp_commands',
                field: 'turn_on_cabin_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_headlights_power', //Включить питание фар
                byte: [0],
                bits: [4, 5],
                table: 'bzp_commands',
                field: 'turn_on_headlights_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_rear_lights_power', //Включить питание задних фонарей
                byte: [0],
                bits: [6, 7],
                table: 'bzp_commands',
                field: 'turn_on_rear_lights_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_air_dryer_power', //Включить питание осушителя воздуха
                byte: [1],
                bits: [0, 1],
                table: 'bzp_commands',
                field: 'turn_on_air_dryer_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_liquid_heater_power', //Включить питание жидкостного подогревателя
                byte: [1],
                bits: [2, 3],
                table: 'bzp_commands',
                field: 'turn_on_liquid_heater_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_fuel_filter_preheater_coarse_filter', //Включить подогрев топливных фильтров грубой очистки
                byte: [1],
                bits: [4, 5],
                table: 'bzp_commands',
                field: 'turn_on_fuel_filter_preheater_coarse_filter',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_fuel_filter_preheater_fine_filter',//Включить подогрев топливных фильтров тонкой очистки
                byte: [1],
                bits: [6, 7],
                table: 'bzp_commands',
                field: 'turn_on_fuel_filter_preheater_fine_filter',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_trailer_power', //Включить питание прицепа
                byte: [2],
                bits: [0, 1],
                table: 'bzp_commands',
                field: 'turn_on_trailer_power',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'turn_on_trailer_power_abs', //Включить питание прицепа (ABC)
                byte: [3],
                bits: [0, 1],
                table: 'bzp_commands',
                field: 'turn_on_trailer_power_abs',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
    {
        id: '0CFFD74D',
        positions: [
            {
                name: 'running_light_command', //команда для огней в движении
                byte: [0],
                bits: [0, 1],
                table: 'dbk_outputs',
                field: 'running_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'alternate_beam_head_light_command', //команда для альтернативного дальнего света
                byte: [0],
                bits: [2, 3],
                table: 'dbk_outputs',
                field: 'alternate_beam_head_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'low_beam_head_light_command', //команда для ближнего света
                byte: [0],
                bits: [4, 5],
                table: 'dbk_outputs',
                field: 'low_beam_head_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'high_beam_head_light_command', //команда для дальнего свет
                byte: [0],
                bits: [6, 7],
                table: 'dbk_outputs',
                field: 'high_beam_head_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'tractor_front_fog_lights_command', //команда для передних противотуманных огней трактора
                byte: [1],
                bits: [0, 1],
                table: 'dbk_outputs',
                field: 'tractor_front_fog_lights_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'rotating_beacon_light_command', //команда для вращающегося маяка
                byte: [1],
                bits: [2, 3],
                table: 'dbk_outputs',
                field: 'rotating_beacon_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'right_turn_signal_lights_command', //команда для правого поворотного сигнала
                byte: [1],
                bits: [4, 5],
                table: 'dbk_outputs',
                field: 'right_turn_signal_lights_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'left_turn_signal_lights_command', //команда для левого поворотного сигнала
                byte: [1],
                bits: [6, 7],
                table: 'dbk_outputs',
                field: 'left_turn_signal_lights_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'center_stop_light_command', //команда для центрального стоп-сигнала
                byte: [2],
                bits: [2, 3],
                table: 'dbk_outputs',
                field: 'center_stop_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'right_stop_light_command', //команда для правого стоп-сигнала
                byte: [2],
                bits: [4, 5],
                table: 'dbk_outputs',
                field: 'right_stop_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'left_stop_light_command', //команда для левого стоп-сигнала
                byte: [2],
                bits: [6, 7],
                table: 'dbk_outputs',
                field: 'left_stop_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'implement_clearance_light_command', //команда для огней освещения прицепа
                byte: [3],
                bits: [0, 1],
                table: 'dbk_outputs',
                field: 'implement_clearance_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'tractor_side_low_mounted_work_lights_command', //команда для боковых низкорасположенных рабочих огней трактора
                byte: [5],
                bits: [0, 1],
                table: 'dbk_outputs',
                field: 'tractor_side_low_mounted_work_lights_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'implement_oem_option_1_light_command', //команда для дополнительного рабочего освещения прицепа (опция 1)
                byte: [6],
                bits: [2, 3],
                table: 'dbk_outputs',
                field: 'implement_oem_option_1_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'implement_right_facing_work_light_command', // команда для рабочего света, направленного вправо на прицепе
                byte: [6],
                bits: [4, 5],
                table: 'dbk_outputs',
                field: 'implement_right_facing_work_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            },
            {
                name: 'implement_left_facing_work_light_command',//команда для рабочего света, направленного влево на прицепе
                byte: [6],
                bits: [6, 7],
                table: 'dbk_outputs',
                field: 'implement_left_facing_work_light_command',
                mapping: {
                    0: 'off',
                    1: 'on',
                }
            }
        ]
    },
];

export default parametersMapping;