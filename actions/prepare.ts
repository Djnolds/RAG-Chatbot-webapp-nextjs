"use server";

import { getChunkedDocsFromPDF, PDFSource } from "@/lib/pdfloader";
import { embedAndStoreDocs } from '@/lib/vectorstore';
import { getPineconeClient } from '@/lib/pinecone-client';



export async function prepare(source: PDFSource) {
  try {
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(source);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pinecone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
}