import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { cpus } from "node:os"

import { Worker } from "node:worker_threads"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workkerFile = path.join(__dirname, "worker.js");

const workersLimit = cpus().length;

const createWorker = (data) => {
    return new Promise((res, rej) => {
        const worker = new Worker(workkerFile, {
            workerData: data,
        });

        worker.on('message', (msg) => res({ status: 'resolved', data: msg }));

        worker.on('error', (e) => {
            rej({ status: "error", data: null })
        });

        worker.on('exit', (code) => {
            if (code !== 0)
                rej(new Error(`Worker stopped with exit code ${code}`));
        });
    })
}

const performCalculations = async () => {
    const workers = [];

    const offset = 2;
    for (let i = offset; i < workersLimit + offset; i++) {
        workers.push(createWorker(i));
    }

    const workersOut = await Promise.allSettled(workers)
    console.log(workersOut);
};

await performCalculations();