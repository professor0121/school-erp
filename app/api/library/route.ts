import { NextRequest, NextResponse } from "next/server";
import { libraryService } from "@/src/modules/library/library.service";
import { verifyToken } from "@/src/utils/jwtToken";

export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get("action");

    if (action === "books") {
      const search = req.nextUrl.searchParams.get("search") || undefined;
      const books = await libraryService.getBooks(search);
      return NextResponse.json({ success: true, data: books });
    }

    if (action === "myIssues") {
      const token = req.cookies.get("accessToken")?.value;
      if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      const decoded = verifyToken(token);

      const userId = req.nextUrl.searchParams.get("userId") || decoded.userId;
      const issues = await libraryService.getUserIssues(userId);
      return NextResponse.json({ success: true, data: issues });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded = verifyToken(token);

    const { action, payload } = await req.json();

    // Librarians or Admins only
    if (!["ADMIN", "LIBRARIAN"].includes(decoded.role) && action !== "get") {
       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (action === "addBook") {
        const book = await libraryService.addBook(payload);
        return NextResponse.json({ success: true, data: book }, { status: 201 });
    }

    if (action === "issueBook") {
        const { bookId, userId, daysAllowed } = payload;
        const res = await libraryService.issueBook(bookId, userId, daysAllowed);
        return NextResponse.json({ success: true, data: res }, { status: 201 });
    }

    if (action === "returnBook") {
        const { issueId, fineCalculated } = payload;
        const res = await libraryService.returnBook(issueId, fineCalculated);
        return NextResponse.json({ success: true, data: res }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
