import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (basic check)
    const mime = file.type || "";
    if (!mime.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Invalid file type, expected PDF" },
        { status: 400 }
      );
    }

    // Simulate upload delay
    await new Promise((res) => setTimeout(res, 1200));

    // Simulate processing delay
    await new Promise((res) => setTimeout(res, 1600));

    const mockSummary = `This is a mock AI-generated summary for ${file.name}. It highlights the document's key points, provides a concise overview, and lists action items.`;

    return NextResponse.json({ summary: mockSummary });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
