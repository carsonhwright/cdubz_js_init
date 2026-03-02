import { Pool } from 'undici';

const ollamaPool = new Pool("http://localhost:11434", {
    connections: 10,
});

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
        partial += decoder.decode(chunk, { stream: true});
        console.log(partial);
    }

    console.log('Streaming complete.');
}

try {
    await streamOllamaCompletion('What is say gex?');
} catch (error) {
    console.error('Error calling Ollama:', error);
} finally {
    console.log('Clossing Ollama pool.');
    ollamaPool.close();
}