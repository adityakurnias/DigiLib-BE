import { BorrowingService } from "../services/borrow.service";

export const BorrowingController = {
  
  getAll: async (c: any) => {
    const result = await BorrowingService.getAll();

    return c.json(result);
  },
  
  request: async (c: any) => {
    const user = c.get("user");
    const id = parseInt(c.req.param("id"));

    const result = await BorrowingService.requestBorrow(user.id, id);

    return c.json(result);
  },

  approve: async (c: any) => {
    const librarian = c.get("user");
    const id = parseInt(c.req.param("id"));

    const result = await BorrowingService.approveBorrow(id, librarian.id);
    return c.json(result);
  },

  reject: async (c: any) => {
    const librarian = c.get("user");
    const id = parseInt(c.req.param("id"));
    const { reason } = await c.req.json();

    const result = await BorrowingService.rejectBorrow(id, reason, librarian.id);
    return c.json(result);
  },

  returnBook: async (c: any) => {
    const librarian = c.get("user");
    const id = parseInt(c.req.param("id"));

    const result = await BorrowingService.returnBook(id, librarian.id);
    return c.json(result);
  }
};
