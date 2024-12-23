import parametersMapping from "../data-structure/parametersMapping";


const extractValue = (
  buffer: Buffer,
  byte: number | number[], 
  bits?: number[], 
  coefficient = 1,
  offset = 0,
  mapping?: Record<number, string>
): any => {
  let extractedValue = 0;


  const byteArray = Array.isArray(byte) ? byte : [byte];


  byteArray.forEach((byteIndex, i) => {
    const byteValue = buffer[byteIndex]; 

    if (bits && bits[i] !== undefined) {
      const bitOffset = bits[i]; 
      const mask = 1 << bitOffset; 
      const bitValue = (byteValue & mask) >> bitOffset; 
      extractedValue = (extractedValue << 1) | bitValue; 
    } else {
      extractedValue = (extractedValue << 8) | byteValue; 
    }
  });


  let finalValue = extractedValue * coefficient + offset;

  if (mapping && mapping.hasOwnProperty(finalValue)) {
    return mapping[finalValue];
  }

  return finalValue;
};

export const processMessage = (
  messageId: string, 
  buffer: Buffer, 
  timestamp: number, 
  uid: string 
) => {
  const groupedData: Record<string, any> = {}; 
  const mapping = parametersMapping.find((m: { id: string }) => m.id === messageId);
  if (!mapping) {
    console.warn(`No mapping found for ID ${messageId}`);
    return groupedData; 
  }

  mapping.positions.forEach(({ byte, bits, table, field, coefficient, offset, mapping }) => {
  
    const byteArray = Array.isArray(byte) ? byte : [byte]; 
    const bitArray = Array.isArray(bits) ? bits : [bits]; 

    byteArray.forEach((b, index) => {
      const bitCount = bitArray[index] !== undefined ? bitArray[index] : 0; 
      const coef = typeof coefficient === 'number' ? coefficient : 1; 
      const off = typeof offset === 'number' ? offset : 0; 
      const map: Record<number, string> = typeof mapping === 'object' && mapping !== null ? mapping : {};

      const value = extractValue(buffer, [b], [bitCount], coef, off, map); 

      if (!groupedData[table]) {
        groupedData[table] = {};
      }


      groupedData[table][field] = value;
    });
  });
  return groupedData; 
};


export const hexStringToBuffer = (hexString: string): Buffer => {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error("Invalid hex string");
  }
  return Buffer.from(hexString, 'hex');
};
