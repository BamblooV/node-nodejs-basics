import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from 'node:crypto';
import { readFile } from "node:fs/promises";

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const content = await readFile(filePath, { encoding: 'utf-8' });
    const hashSum = createHash('sha256').update(content, "utf-8");

    console.log(hashSum.digest('hex'));
};

await calculateHash();