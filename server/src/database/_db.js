import { query } from "express";
import fs from "node:fs/promises"



const db = {
    loadRecords,
    update,
    search
}

export default db;

async function loadRecords(tableName){
        const filePath = new URL(
        tableName == "users"?
        './users.json' : "./books.json", import.meta.url);


    try { 
     return JSON.parse(await fs.readFile(filePath,{ encoding: 'utf8' }))
    } catch (error) {
       return []
    }
   
}

async function search(records,query){  
        return await new Promise((resolve,reject)=>{
            const outcome = records.find(
                (record) => query.id ? record.id.indexOf(query.id) !== -1 : true &&
                query.username ? record.username.toLowerCase().indexOf(query.username.toLowerCase().trim()) !== -1 : false
              );
    
            outcome ? resolve(outcome) : reject(new Error(`${tableName} not found`))
               
        })
            
}

async function update(tableName,query,bookID,resolve){
    const filePath = new URL(
        tableName == "users"?
        './users.json' : "./books.json", import.meta.url);
    try {
        const records = await loadRecords(tableName)
        const user = await search(records,query)
        console.log(user)
        user.favorites.push(bookID)
        
        await fs.writeFile(filePath,JSON.stringify(records),{ encoding: 'utf8' })
        resolve(["success","record updated"])
        
    } catch (error) {
        resolve(["error","Unable to update record"])
    }   
  
}


