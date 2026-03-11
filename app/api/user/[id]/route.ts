import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/src/modules/user/user.service";

/**
 * GET USER BY ID
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    console.table(id);
    const user = await userService.getUserById(id);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "User not found",
      },
      { status: 404 }
    );
  }
};

/**
 * UPDATE USER
 */
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();

    const user = await userService.updateUser(id, body);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Update failed",
      },
      { status: 500 }
    );
  }
};

/**
 * DELETE USER
 */
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    await userService.deleteUser(id);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Delete failed",
      },
      { status: 500 }
    );
  }
};