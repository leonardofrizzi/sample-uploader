import { NextRequest, NextResponse } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const authCookie = request.cookies.get("auth");
  return authCookie?.value === "true";
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}
