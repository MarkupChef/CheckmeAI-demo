import * as fs from 'fs';
import * as path from 'path';

export default function loadPromptTemplate(fileName: string): string {
  const filePath = path.join(process.cwd(), 'src', 'server', 'prompts', fileName);

  return fs.readFileSync(filePath, 'utf8');
}
