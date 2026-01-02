import { NextRequest, NextResponse } from "next/server";
import { StoredFile } from "@/types";
import { isAuthenticated, unauthorizedResponse } from "@/utils/auth";

const uploadedFiles: StoredFile[] = [];

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return unauthorizedResponse();
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const savedFiles: StoredFile[] = [];

    for (const file of files) {
      const storedFile: StoredFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };

      uploadedFiles.push(storedFile);
      savedFiles.push(storedFile);
    }

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return unauthorizedResponse();
  }

  return NextResponse.json({ files: uploadedFiles });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return unauthorizedResponse();
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "File ID is required" },
      { status: 400 }
    );
  }

  const index = uploadedFiles.findIndex((f) => f.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }

  uploadedFiles.splice(index, 1);

  return NextResponse.json({ message: "File deleted successfully" });
}
