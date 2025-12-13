import app from "./src/app.js";

app.get("/", (req,res)=>{
    res.json({
        message:"Server is running on port",
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

