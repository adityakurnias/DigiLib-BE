import { db } from "../databases";
import { borrowings } from "../databases/schema/borrowings";
import { books } from "../databases/schema/books";
import { eq } from "drizzle-orm";

export const BorrowingService = {
  getAll: async () => {
    const borrowList = await db.select().from(borrowings);

    return { success: true, data: borrowList };
  },
  
  getByUser: async (userId: number) => {
    const borrowList = await db.select().from(borrowings).where(eq(borrowings.userId, userId));

    return { success: true, data: borrowList };
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
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7); // 7 hari peminjaman

    await db.update(borrowings)
      .set({
        status: "borrowed",
        approvedBy: librarianId,
        borrowDate: today,
        dueDate,
      })
      .where(eq(borrowings.id, id));

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
    await db.update(borrowings)
      .set({
        status: "returned",
        returnDate: new Date(),
        processedBy: librarianId
      })
      .where(eq(borrowings.id, id));

    return { success: true, message: "Book returned" };
  }
};
