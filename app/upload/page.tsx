"use client";

import { prepare } from "@/actions/prepare";
import PDFFileUpload, { FileProps } from "@/components/PDFFilesUploader";
import { Button } from "@/components/ui/button";
import { PDFSource } from "@/lib/pdfloader";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<FileProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  async function submit() {
    try {
      setLoading(true);
      setLoadingMsg("Initializing Client and creating index...");

      const pdfSource: PDFSource = {
        type: "url",
        source: file?.url ?? "",
      };
      await prepare(pdfSource);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingMsg("");
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex flex-1 justify-center py-16">
        <div className="w-md max-w-2xl mx-auto">
          {file ? (
            <>
              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  {loadingMsg}
                </Button>
              ) : (
                <Button onClick={() => submit()}>Upload to Pinecone</Button>
              )}
            </>
          ) : (
            <PDFFileUpload
              label="Upload your knowlegde base PDF file"
              file={file}
              setFile={setFile}
              endpoint="pdfUpload"
            />
          )}
        </div>
      </div>
    </div>
  );
}