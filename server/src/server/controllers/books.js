import db from "../../database/_db.js"
export default function books(req,res,next){
    db.loadRecords({ type: 'books' }).then((records)=>{
        res.status(200).json({
            status:200,
            statusText:"OK",
            message: records.length == 0? "There are no books available at this time" : "Retrieving all books",
            data:records
        })

    }).catch((err)=> next(err))
}