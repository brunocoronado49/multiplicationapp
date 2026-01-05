import fs from 'fs';
import { SaveFile } from '../../../src/domain/usecases/save-file.use-case';

describe('usecases/save-file.use-case', () => {
  beforeEach(() => {
    fs.rmSync('outputs', { recursive: true });
  });

  afterEach(() => {
    fs.rmSync('outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };
    const saveFile = new SaveFile();
    const file = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(file).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });
});
