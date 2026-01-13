"use client";

import { Button } from "@/components/ui/button";

type Props = {
  summary: string;
  onReset: () => void;
};

export function PdfSummary({ summary, onReset }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">AI-Generated Summary</h2>
      <div className="rounded-md border p-4 bg-gray-50 text-sm text-slate-800">
        {summary}
      </div>
      <div>
        <Button variant="ghost" onClick={onReset}>
          Upload another PDF
        </Button>
      </div>
    </div>
  );
}

export default PdfSummary;
