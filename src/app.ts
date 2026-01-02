import { yarg } from './config/plugins/args.plugin.ts';
import { ServerApp } from './presentation/server-app.ts';

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: showTable } = yarg;
  ServerApp.run({ base, limit, showTable });
}
