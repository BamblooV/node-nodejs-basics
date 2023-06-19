const transform = async () => {
    const inStream = process.stdin;
    const outStream = process.stdout;
    inStream.setEncoding('utf-8');

    inStream.on('readable', () => {
        const chunk = inStream.read();

        if (chunk !== null) {
            outStream.write(chunk.split('').reverse().join('') + '\n');
        }
    });
};

await transform();