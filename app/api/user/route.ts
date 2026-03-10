// Create a new user and their profile based on the role
// POST /api/user
import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/src/modules/user/user.service";

export async function POST(req: NextRequest) {
  try {
    const result = await userService.createUser(req);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create user",
      },
      { status: 500 }
    );

  }
}