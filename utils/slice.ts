export const sliceIntoChunks = (arr: any[], n: number) => {
    let chunkLength = Math.max(arr.length/n, 1);
    let chunks = [];

    for (let i = 0; i < n; i++) {
        if (chunkLength*(i+1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
    }

    return chunks;
}