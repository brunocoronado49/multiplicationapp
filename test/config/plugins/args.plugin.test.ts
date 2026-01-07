const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('../../../src/config/plugins/args.plugin');
  return yarg;
};

describe('plugins/args.plugin', () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async () => {
    const arg = await runCommand(['-b', '5']);

    expect(arg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: './outputs',
      })
    );
  });

  test('should return custom values', async () => {
    const arg = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'dir']);

    expect(arg).toEqual(
      expect.objectContaining({
        b: 8,
        l: 20,
        s: true,
        n: 'custom-name',
        d: 'dir',
      })
    );
  });
});
