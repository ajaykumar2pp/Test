import * as PdfParse from "pdf-parse-new";
import mammoth from "mammoth";

export async function extractResumeText(file) {
  const buffer = Buffer.from(await file.arrayBuffer());

  // PDF
  if (file.type === "application/pdf") {
    const parser = new PdfParse.SmartPDFParser();

    const result = await parser.parse(buffer);

    return result.text;
  }

  // DOCX
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value;
  }

  throw new Error(
    "Unsupported file type. Please upload PDF or DOCX."
  );
}