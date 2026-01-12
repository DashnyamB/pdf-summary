"use client";

import { Input } from "@/src/components/ui/input";

type Props = {
  onFileSelected: (file?: File) => void;
  disabled?: boolean;
};

export function PdfUpload({ onFileSelected, disabled }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Select PDF
      </label>
      <Input
        type="file"
        accept="application/pdf"
        onChange={(e) => onFileSelected(e.target.files?.[0])}
        disabled={disabled}
      />
      <div className="text-sm text-muted-foreground">
        Choose a PDF file (PDF only).
      </div>
    </div>
  );
}

export default PdfUpload;
