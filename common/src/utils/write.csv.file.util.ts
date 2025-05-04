import * as Papa from 'papaparse';
import * as fs from 'fs';
import * as path from 'path';

export const writeCsvFile = (filePath: string, data: any) => {
  try {
    const csv = Papa.unparse(data);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, csv);
  } catch (error) {
    console.log(error);
    throw error;
  }
};