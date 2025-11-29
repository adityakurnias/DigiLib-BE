import { db } from "../databases/index"
import { readlist } from "../databases/schema/readlist"

export const ReadlistService = {
  getAll: async () => {
    const readlists = db.select().from(readlist)
    
    return { success: true, data: readlists }
  },
  
  create: async () => {
  
  }
}