export interface CreateTableUseCase {
  execute: (options: Options) => string;
}

export interface Options {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {}

  execute({ base, limit = 10 }: Options): string {
    let outputMessage: string = '';
    for (let i: number = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}\n`;
    }

    return outputMessage;
  }
}
