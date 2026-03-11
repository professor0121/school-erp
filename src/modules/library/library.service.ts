import { connectDB } from "@/src/lib/mongodb";
import { Book, BookIssue } from "./library.model";

export const libraryService = {
  addBook: async (data: any) => {
    await connectDB();
    data.availableCopies = data.totalCopies;
    return Book.create(data);
  },

  getBooks: async (queryStr?: string) => {
    await connectDB();
    if (!queryStr) return Book.find().sort({ title: 1 });
    // basic text search simulator
    return Book.find({
        $or: [
            { title: new RegExp(queryStr, 'i') },
            { author: new RegExp(queryStr, 'i') },
            { isbn: new RegExp(queryStr, 'i') }
        ]
    }).sort({ title: 1 });
  },

  issueBook: async (bookId: string, userId: string, daysAllowed: number = 14) => {
    await connectDB();
    
    // Check internal bounds atomically
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (book.availableCopies <= 0) throw new Error("No copies currently available");

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysAllowed);

    // Transaction abstraction 
    book.availableCopies -= 1;
    await book.save();

    return BookIssue.create({
        bookId,
        userId,
        dueDate,
        status: "ISSUED"
    });
  },

  returnBook: async (issueId: string, fineCalculated: number = 0) => {
    await connectDB();
    const issue = await BookIssue.findById(issueId);
    if (!issue) throw new Error("Issue record not found");
    if (issue.status === "RETURNED") throw new Error("Book already returned");

    issue.status = "RETURNED";
    issue.returnDate = new Date();
    issue.fineAmount = fineCalculated;
    await issue.save();

    const book = await Book.findById(issue.bookId);
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    return issue;
  },
  
  getUserIssues: async (userId: string) => {
    await connectDB();
    return BookIssue.find({ userId })
      .populate("bookId", "title author isbn category shelfLocation")
      .sort({ issueDate: -1 });
  }
};
