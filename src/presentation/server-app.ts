interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run(options: RunOptions) {
    console.log(options);
    console.log('Server running...');
  }
}
