const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require ("path");
const chat = require("./model/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
.then(() =>{
    console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/whatsapp");

}






app.get("/", (req,res) =>{
    res.send("root is working");
    let date = new Date();
    console.log(date.toString().split(" ")[4]);
})

//index Route
app.get("/chats", async (req,res) =>{
    let chats = await chat.find();
    //console.log(chats);
    res.render("index.ejs", {chats})
});

//New route
app.get("/chats/new", (req,res) =>{
     res.render("new.ejs");
})

//new rouete for edit
app.get("/chats/:id/edit", async(req,res)=>{
    let { id } = req.params;
    let chatEdit = await chat.findById(id);
    res.render("edit.ejs", {chatEdit});
})

//show message in chats page
app.post("/chats",(req,res) => {
    let { from, to, msg} = req.body;
    let newChat = new chat ({
        from: from,
        to : to,
        msg : msg,
        created_at : new Date(),
        updated_at : new Date()
    });
    console.log(newChat);
})

//post edit
app.put("/chats/:id", async(req,res)=>{
    let{ id } = req.params;
    let {msg : newmsg } = req.body;

    let updateDateTime = new Date();
    console.log(updateDateTime);
    let updateChat = await chat.findByIdAndUpdate(
        id,
        {msg : newmsg, updated_at : updateDateTime},
        {runValidators :true, new: true}

    );
        console.log(updateChat);
        res.redirect("/chats");

})

//destory route
app.delete("/chats/:id", async(req,res) =>{
    let{ id } = req.params;
    let deleteChat =  await chat.findByIdAndDelete(id)
    console.log(deleteChat);
    res.redirect("/chats");
})




app.listen(8000, ()=>{
    console.log("server is listing on port 8000");

});