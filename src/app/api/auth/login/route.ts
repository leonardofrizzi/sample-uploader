import { NextRequest, NextResponse } from "next/server";

const MOCK_USER = {
  id: "1",
  email: "demo@hearsay.com",
  name: "Demo User",
};

const MOCK_PASSWORD = "demo123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      return NextResponse.json(MOCK_USER);
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}
