import { ChromaClient } from "chromadb";
import type { AddRecordsParams, QueryRecordsParams } from "chromadb";

const client = new ChromaClient();

const collection = await client.getOrCreateCollection({ name: "my_chroma" });

export const addToChroma = async (params: AddRecordsParams) => {
  await collection.add(params);
};

export const queryChroma = async (query: QueryRecordsParams) => {
  const result = await collection.query(query);
  return result;
};
