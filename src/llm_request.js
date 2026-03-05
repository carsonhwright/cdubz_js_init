import { Pool } from 'undici';

// undici is the latest version of fetch with more features, fetch is a
// packaged version of undici

const ollamaPool = new Pool("http://localhost:11434", {
    connections: 10,
});

/**
 * Stream the completion of a prompt using the Ollama API, needs to be
 * serving and needs the mistral LLM installed:
 * 
 * Some shell commands to get things going:
 * $ apk add ollama
 * $ ollama serve &
 * $ ollama run mistral &
 *  
 * @param {*} prompt - ask your question, seeker of knowledge
 **/
async function streamOllamaCompletion(prompt) {
    const { statusCode, body} = await ollamaPool.request({
        path: '/api/generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model: 'mistral'}),
    });

    if (statusCode !== 200) {
        // consuming the response is mandatory? Consume?
        await body.dump();
        throw new Error(`Ollama request failed with status ${statusCode}`);
    }

    let partial = '';
    const decoder = new TextDecoder();
    for await (const chunk of body) {
        partial += JSON.parse(decoder.decode(chunk, { stream: true}))["response"]
                
        // the streaming thing is made clear by logging it here, but 
        // its annoying leaving for debugging I guess
        // console.log(partial);
    }
    console.log(partial);
    console.log('Streaming complete.');
}

try {
    await streamOllamaCompletion(`Write a program that will print hello world, do so in C`);
} catch (error) {
    console.error('Error calling Ollama:', error);
} finally {
    console.log('Closing Ollama pool.');
    ollamaPool.close();
}
