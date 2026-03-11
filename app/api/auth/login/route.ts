import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/src/modules/auth/auth.service";
import { connectDB } from "@/src/lib/mongodb";

export const GET = async () => {
  return NextResponse.json(
    { message: "Hello from the auth API!" },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {

  try {
    console.table({ req })
    await connectDB();
    const { uniqueId, password } = await req.json();

    const result = await authService.login(uniqueId, password);

    if (result.message) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    const { token, user } = result;

    const response = NextResponse.json(
      {
        success: true,
        data: user,
        token: token,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "accessToken",
      value: token || "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Login failed",
      },
      { status: 500 }
    );
  }
};