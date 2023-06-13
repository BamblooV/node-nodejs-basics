import { access, open } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath);
    } catch (e) {
        throw new Error("File don't exist");
    }

    try {
        const fd = await open(filePath);
        const stream = fd.createReadStream();

        stream.pipe(process.stdout)
    } catch (e) {
        console.log(e);
    }


};

await read();