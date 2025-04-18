import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  pdfUpload: f({
    pdf: { maxFileSize: "1MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.ufsUrl);
    return { uploadedBy: "AY" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// metadata