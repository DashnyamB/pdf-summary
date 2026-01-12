export type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "success"
  | "error";

export interface ApiResponse {
  summary: string;
}

export interface PdfState {
  status: UploadStatus;
  error?: string;
  summary?: string;
}
