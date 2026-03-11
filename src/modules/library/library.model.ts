import mongoose, { Schema } from "mongoose";

// Catalog of physical library assets
export interface IBook {
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}
const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  shelfLocation: { type: String }
}, { timestamps: true });

// Log tracking issuance and return
export interface IBookIssue {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // staff or student
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "ISSUED" | "RETURNED" | "LOST";
  fineAmount: number;
}
const BookIssueSchema = new Schema<IBookIssue>({
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ["ISSUED", "RETURNED", "LOST"], default: "ISSUED" },
  fineAmount: { type: Number, default: 0 }
}, { timestamps: true });

export const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);
export const BookIssue = mongoose.models.BookIssue || mongoose.model("BookIssue", BookIssueSchema);
