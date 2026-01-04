import { SaveFile } from '../domain/usecases/save-file.use-case.ts';
import { CreateTable } from '../domain/usecases/create-table.use-case.ts';

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    console.log('Server running...');

    const table = new CreateTable().execute({ base, limit });
    const created = new SaveFile().execute({
      fileName,
      fileContent: table,
      destination: fileDestination,
    });

    if (showTable) console.log(table);
    created ? console.log('Created successfully') : console.log('File not created');
  }
}
