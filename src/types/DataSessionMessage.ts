interface DataSessionMessage {
    t: number; // Временная метка (UNIX timestamp)
    p: {
      cnt: number; // Количество сообщений
      mess: Array<{
        t: number, 
        i: string;  // Идентификатор сообщения
        d: string;  // Данные в формате HEX
      }>;
    };
  }

  
  interface ParameterMapping {
    id: string; // Идентификатор сообщения
    positions: Array<{
      name:string;
      byte: number[]; // Начальный байт
      bits?: number[]; // Количество бит
      table: string; // Таблица, куда записывать
      field: string; // Поле в таблице
      coefficient?: number; // Коэффициент для значения
      offset?: number; // Смещение
      mapping?:Record<number, string>; 
    }>;
  }