import parametersMapping from "../data-structure/parametersMapping";

export const extractValue = (
  buffer: Buffer,
  bytes: number | number[],
  bits?: number | number[],
  coefficient = 1,
  offset = 0,
  mapping?: Record<number, string>
): any => {
  let extractedValue = 0;

  const byteArray = Array.isArray(bytes) ? bytes : [bytes];
  const bitArray = Array.isArray(bits) ? bits : bits !== undefined ? [bits] : undefined;

  if (!bitArray) {
    byteArray.forEach((byteIndex) => {
      const byteValue = buffer[byteIndex];
      extractedValue = (extractedValue << 8) | byteValue;
      extractedValue = extractedValue >>> 0; 

      console.log(`byteValue (0x${byteValue.toString(16)}) => extractedValue (0x${extractedValue.toString(16)})`);
    });
  } else {
    byteArray.forEach((byteIndex, i) => {
      const byteValue = buffer[byteIndex];

      if (bitArray && bitArray[i] !== undefined) {
        const bitOffset = bitArray[i];
        const mask = 1 << bitOffset;
        const bitValue = (byteValue & mask) >> bitOffset;

        extractedValue = (extractedValue << 1) | bitValue;
        extractedValue = extractedValue >>> 0;  

        console.log("extractedValue", extractedValue);
      }
    });
  }


  const finalValue = extractedValue * coefficient + offset;

  if (mapping && mapping.hasOwnProperty(finalValue)) {
    return mapping[finalValue];  
  }

  return finalValue;  
};

export const processMessage = (
  messageId: string,
  buffer: Buffer,
) => {
  const groupedData: Record<string, any> = {};

  const mapping = parametersMapping.find((m: { id: string }) => m.id === messageId);

  if (!mapping) {
    console.warn(`No mapping found for ID ${messageId}`);
    return groupedData;
  }

  mapping.positions.forEach(({ byte, bits, table, field, coefficient, offset, mapping }) => {
    const coef = typeof coefficient === 'number' ? coefficient : 1;
    const off = typeof offset === 'number' ? offset : 0;
    const map: Record<number, string> =
      typeof mapping === 'object' && mapping !== null ? mapping : {};

    const value = extractValue(buffer, byte, bits, coef, off, map);

    if (!groupedData[table]) {
      groupedData[table] = {};
    }

    groupedData[table][field] = value;
  });

  return groupedData;
};



export const hexStringToBuffer = (hexString: string): Buffer => {
  if (!/^[0-9A-Fa-f]+$/.test(hexString)) {
    throw new Error("Invalid hex string");
  }
  return Buffer.from(hexString, 'hex');
};
