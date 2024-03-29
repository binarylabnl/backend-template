import { config } from './infrastructure/config/config.js';
import { http, listen } from './infrastructure/http/http.js';
import { logger } from './infrastructure/logger/logger.js';
import { exampleModule } from './modules/example/example.module.js';

// Load modules
await exampleModule({ http });

logger.info(`Retech backend started in ${config.NODE_ENV} mode`);

await listen();
