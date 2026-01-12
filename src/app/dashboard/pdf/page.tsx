"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import PdfUpload from "./components/PdfUpload";
import PdfStatus from "./components/PdfStatus";
import PdfSummary from "./components/PdfSummary";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { UploadStatus, ApiResponse } from "./types";
import {
  FileText,
  LayoutDashboard,
  Inbox,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";

export default function PdfPage() {
  const [file, setFile] = useState<File | undefined>();
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | undefined>();
  const [summary, setSummary] = useState<string | undefined>();

  async function handleGenerate() {
    if (!file) {
      setError("Please select a PDF file.");
      setStatus("error");
      return;
    }

    setError(undefined);
    setStatus("uploading");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch("/api/pdf", { method: "POST", body: fd });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const data: ApiResponse = await uploadRes.json();
      setSummary(data.summary);
      setStatus("success");
    } catch (err: any) {
      setError(err?.message || "Processing failed");
      setStatus("error");
    }
  }

  function handleReset() {
    setFile(undefined);
    setSummary(undefined);
    setError(undefined);
    setStatus("idle");
  }

  const isBusy = status === "uploading" || status === "processing";

  const statusLabel =
    status === "idle"
      ? "Idle"
      : status === "uploading"
      ? "Uploading"
      : status === "processing"
      ? "Processing"
      : status === "success"
      ? "Completed"
      : "Error";

  const progressValue =
    status === "uploading"
      ? 30
      : status === "processing"
      ? 75
      : status === "success"
      ? 100
      : 0;

  const progressClassName = isBusy ? "h-2 animate-pulse" : "h-2";

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex h-screen w-full gap-6 px-8 py-6">
        {/* Sidebar */}
        <aside className="flex w-60 flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                PDF Console
              </div>
              <div className="text-xs text-muted-foreground">
                Internal tools
              </div>
            </div>
          </div>
          <nav className="space-y-1 text-sm">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Inbox className="mr-2 h-4 w-4" /> Inbox
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </nav>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <span>v0.1.0 • Internal</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </aside>

        {/* Main content + right rail */}
        <main className="flex flex-1 gap-6">
          {/* Center column */}
          <section className="flex-1 space-y-4">
            <Card className="border-0 bg-primary text-primary-foreground shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-2xl">PDF Summary</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    Upload a PDF document to generate an AI-based summary.
                  </CardDescription>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleReset}
                  disabled={isBusy}
                >
                  New upload
                </Button>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document workflow</CardTitle>
                <CardDescription>
                  Upload, process, and review a single PDF at a time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PdfUpload
                  onFileSelected={(f) => setFile(f)}
                  disabled={isBusy}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={handleGenerate} disabled={isBusy}>
                    {isBusy && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isBusy ? "Processing..." : "Generate summary"}
                  </Button>
                  {isBusy && (
                    <div className="w-48">
                      <Progress
                        value={progressValue}
                        className={progressClassName}
                      />
                    </div>
                  )}
                  <PdfStatus
                    status={
                      status === "uploading"
                        ? "uploading"
                        : status === "processing"
                        ? "processing"
                        : status === "error"
                        ? "error"
                        : "idle"
                    }
                    error={error}
                  />
                </div>
              </CardContent>
              {status === "success" && summary && (
                <CardFooter className="border-t bg-muted/40 pt-6">
                  <PdfSummary summary={summary} onReset={handleReset} />
                </CardFooter>
              )}
            </Card>
          </section>

          {/* Right rail */}
          <aside className="w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Run status</CardTitle>
                <CardDescription>
                  High-level view of the current upload.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{statusLabel}</span>
                </div>
                <Progress value={progressValue} className={progressClassName} />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last result</span>
                  <span className="truncate text-right text-xs text-muted-foreground">
                    {summary ? "Summary ready" : "No summary generated yet"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
                <CardDescription>
                  For best results, upload focused reports or briefs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <p>• Prefer PDFs under 10MB for faster processing.</p>
                <p>• Summaries work best with clear section headings.</p>
                <p>• Avoid scanned images without selectable text.</p>
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
}
