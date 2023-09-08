import { describe } from "node:test"
import db from "../../src/database/_db.js"

describe("loadRecords",()=>{
    it("should return a list of users when the input is 'users'",async ()=>{
        const outcome = await db.loadRecords("users")
        expect(outcome).toHaveLength(2)
        expect(outcome[0]).toHaveProperty("id")
        expect(outcome[0]).toHaveProperty("username")
    })


    it("should return a list of books when the input is 'books'",async ()=>{
        const outcome = await db.loadRecords("books")
        expect(outcome).toHaveLength(3)
        expect(outcome[0]).toHaveProperty("id")
        expect(outcome[0]).toHaveProperty("title")
        expect(outcome[0]).toHaveProperty("author")
    })
})


describe("search",()=>{
    it("it should resolve with an obejct if query match the record",async ()=>{
        const records = [{id:"1",username:"hello"},{id:2,username:"hi"}]
        
        const outcome = await db.search(records,{id:1})
        expect(outcome).toMatchObject(records[0])

    })


    it("should throw if no user found",async ()=>{
       await expect(db.search([],{})).rejects.toThrow(`Please the records and the query arguments`);
    })
})