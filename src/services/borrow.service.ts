import { db } from "../databases";
import { borrowings } from "../databases/schema/borrowings";
import { books } from "../databases/schema/books";
import { eq, and } from "drizzle-orm";

export const BorrowingService = {
  getAll: async () => {
    const borrowList = await db
      .select()
      .from(borrowings)
      .leftJoin(books, eq(borrowings.bookId, books.id))
      .where(eq(books.id, books.id));

    const cleaned = borrowList.map((row: { borrowings: any; }) => row.borrowings);

    return { success: true, data: cleaned };
  },

  getByUser: async (userId: number) => {
    const borrowList = await db
      .select()
      .from(borrowings)
      .leftJoin(books, eq(borrowings.bookId, books.id))
      .where(and(eq(borrowings.userId, userId), eq(books.id, books.id)));

    const cleaned = borrowList.map((row: { borrowings: any; }) => row.borrowings);

    return { success: true, data: cleaned };
  },

  requestBorrow: async (userId: number, bookId: number) => {
    const insert = await db.insert(borrowings).values({
      userId,
      bookId,
      status: "pending"
    })

    return { success: true, message: "Borrow request sent" };
  },

  approveBorrow: async (id: number, librarianId: number) => {
    const [br] = await db.select().from(borrowings).where(eq(borrowings.id, id));
    if (!br) return { success: false, message: "Borrowing record not found" };

    const [book] = await db.select().from(books).where(eq(books.id, br.bookId));
    if (!book) return { success: false, message: "Book not found" };

    if (book.available <= 0) {
      return { success: false, message: "Book is out of stock" };
    }

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7);

    await db.update(borrowings)
      .set({
        status: "borrowed",
        approvedBy: librarianId,
        borrowDate: today,
        dueDate,
      })
      .where(eq(borrowings.id, id));

    await db.update(books)
      .set({ available: book.available - 1 })
      .where(eq(books.id, br.bookId));

    return { success: true, message: "Borrow request approved" };
  },


  rejectBorrow: async (id: number, reason: string, librarianId: number) => {
    await db.update(borrowings)
      .set({
        status: "rejected",
        rejectedReason: reason,
        approvedBy: librarianId
      })
      .where(eq(borrowings.id, id));

    return { success: true, message: "Borrow request rejected" };
  },

  returnBook: async (id: number, librarianId: number) => {
    const borrowList = await db.select().from(borrowings).where(eq(borrowings.id, id));

    if (!borrowList.length) {
      return { success: false, message: "Borrowing record not found", status: 404 };
    }

    const br = borrowList[0];

    const bookList = await db.select().from(books).where(eq(books.id, br.bookId));
    if (!bookList.length) {
      return { success: false, message: "Book not found", status: 404 };
    }

    const book = bookList[0];

    await db.update(borrowings)
      .set({
        status: "returned",
        returnDate: new Date(),
        processedBy: librarianId
      })
      .where(eq(borrowings.id, id));

    await db.update(books)
      .set({ available: book.available + 1 })
      .where(eq(books.id, br.bookId));

    return { success: true, message: "Book returned" };
  },

};
