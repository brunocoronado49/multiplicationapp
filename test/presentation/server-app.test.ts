import { CreateTable } from '../../src/domain/usecases/create-table.use-case';
import { SaveFile } from '../../src/domain/usecases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';

describe('presentation/server-app', () => {
  const options = {
    base: 20,
    limit: 10,
    showTable: false,
    fileName: 'file-name',
    fileDestination: 'file-destination',
  };

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create ServerApp instance', () => {
    const app = new ServerApp();

    expect(app).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  test('should run ServerApp with options', () => {
    // const logSpy = jest.spyOn(console, 'log');
    // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
    // ServerApp.run(options);
    // expect(logSpy).toHaveBeenCalledTimes(2);
    // expect(logSpy).toHaveBeenCalledWith('Server running...');
    // expect(logSpy).toHaveBeenCalledWith('Created successfully');
    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   destination: options.fileDestination,
    //   fileName: options.fileName,
    // });
  });

  test('should run with custom values mocked', () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1x2=2');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenLastCalledWith({ base: options.base, limit: options.limit });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1x2=2',
      destination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith('Created successfully');
  });
});
