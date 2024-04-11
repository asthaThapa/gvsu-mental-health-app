import { CohereEmbeddings } from "@langchain/cohere";
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
    apiKey: '0e5085ac-6c93-440c-9102-a504358e2f5a'
});

const index_name = 'mentalhealth-embeddings';
const index = pinecone.Index(index_name);

const embeddingTool = new CohereEmbeddings({
    model: "embed-english-v3.0",
    inputType: "search_query",
    apiKey: "XajXDwqxrGS3UX9mJq5FhInQb0FK6ICkgzgrjgRK"
});


export async function getCohereEmbeds(text: string) {
    const res = await embeddingTool.embedQuery(text);

    const results = await index.query({
        vector: res,
        topK: 5,
        includeMetadata: true,
        includeValues: false,
    });

    const matches = results['matches'];
    if (matches) {
        const resultString = matches[0]?.metadata?.answer ?? '';
        console.log(resultString);
        return resultString
    }

    return 'No matches found';
}
