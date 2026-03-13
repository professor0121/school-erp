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

// paginated GET /api/user?page=1&limit=10
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const role = searchParams.get("role");

    // pass role only if exists
    const result = await userService.getUsers(page, limit, role || undefined);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}