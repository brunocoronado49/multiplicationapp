import fs from 'fs';
import { SaveFile } from '../../../src/domain/usecases/save-file.use-case';

describe('usecases/save-file.use-case', () => {
  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    const customOutputsFolderExists = fs.existsSync('cusotm-outputs');
    if (outputFolderExists) fs.rmSync('outputs', { recursive: true });
    if (customOutputsFolderExists) fs.rmSync('cusotm-outputs', { recursive: true });
  });

  test('should save file with default values', () => {
    const filePath: string = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };
    const saveFile = new SaveFile();
    const file: boolean = saveFile.execute(options);
    const checkFile: boolean = fs.existsSync(filePath);
    const fileContent: string = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(file).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'custom content',
      destination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    };

    const filePath: string = `${options.destination}/${options.fileName}.txt`;
    const result: boolean = saveFile.execute(options);
    const fileExists: boolean = fs.existsSync(filePath);
    const fileContent: string = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();

    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Custom error message testing!');
    });

    const result = saveFile.execute({ fileContent: 'test directory content' });
    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });

  test('should return false if file could not be saved', () => {
    const saveFile = new SaveFile();

    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Custom error message writing!');
    });

    const result = saveFile.execute({ fileContent: 'file saved content' });
    expect(result).toBe(false);

    writeFileSpy.mockRestore();
  });
});
