import app from "./src/app.js"; 
import connectDB from "../Backend/src/db/db.js"


const startServer = async()=>{
    try {
        await connectDB()
        app.listen(3000,()=>{
            console.log("Server is running on port 3000");
 
        })
    } catch (error) {
        
    }
}

startServer();