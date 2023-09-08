import db from "../_db.js";
export default async function search({type,query}) {
    let records = await db.loadRecords({type:type});
    if(type == 'users'){
        records = records.find(
            (record) => query.id ? record.id.indexOf(query.id) : true &&
            query.username ? record.username.toLowerCase().indexOf(query.username.toLowerCase().trim()) != -1 : true
          );

          return records
       
    }
   

  

  
}
