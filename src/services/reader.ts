import readline from 'readline';
import fs from 'fs';
import { PATH } from '../config/config';

export async function readCompanies(): Promise<string[]> {
  const names: string[] = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(PATH),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (trimmed.length > 3) {
      names.push(trimmed);
    }
  }

  return names;
}