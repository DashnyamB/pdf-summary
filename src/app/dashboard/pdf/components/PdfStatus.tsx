"use client";

type Props = {
  status: "uploading" | "processing" | "error" | "idle";
  error?: string;
};

export function PdfStatus({ status, error }: Props) {
  if (status === "idle") return null;
  if (status === "uploading")
    return <div className="text-sm text-slate-600">Uploading file...</div>;
  if (status === "processing")
    return <div className="text-sm text-slate-600">Processing document...</div>;
  return (
    <div className="text-sm text-red-600">
      {error || "An error occurred. Please try again."}
    </div>
  );
}

export default PdfStatus;
