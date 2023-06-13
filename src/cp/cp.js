import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { execFile, fork } from 'node:child_process';

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const processFile = path.join(__dirname, 'files', 'script.js');

    fork(processFile, args)
};

// Put your arguments in function call to test this functionality
spawnChildProcess([12, 34, 'asd']);
