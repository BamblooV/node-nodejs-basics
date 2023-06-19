const parseArgs = () => {
    const parsedArgs = [];
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i].startsWith("--")) {
            const pair = `${process.argv[i].slice(2)} is ${process.argv[i + 1]}`
            parsedArgs.push(pair);
            i++;
        }
    }

    console.log(parsedArgs.join(', '));
};

parseArgs();