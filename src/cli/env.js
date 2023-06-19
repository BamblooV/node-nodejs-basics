const parseEnv = () => {
    const envVariables = [];

    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith("RSS_")) {
            envVariables.push(`${key}=${value}`)
        }
    }

    console.log(envVariables.join("; "));
};

parseEnv();