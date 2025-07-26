const app = require("./app")
const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{

    res.json("welcome")

})

app.listen(PORT,()=>console.log(`server running on port ${PORT}`)
)