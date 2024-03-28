const mongoose = require("mongoose");
const chat = require('./model/chat.js');

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

main()
    .then((res) => {
        console.log("Chat DB for initialization connected successfully ............ ");
    })
    .catch((err) => {
        console.log(err);
    })
    let allchats = [
        {
            from: "Nabami Pal",
            to: "Me",
            msg: "Send me your CV",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Rahul",
            to: "Me",
            msg: "How are you?",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Kaushik",
            to: "Me",
            msg: "When you come to college",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Saiket Dey",
            to: "Me",
            msg: "How can I help you",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Didi",
            to: "Me",
            msg: "ki re kamon achis?",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Dada",
            to: "Me",
            msg: "Tor DP ta khub bhalo hoiche kothau gachilis?",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            from: "Ma",
            to: "Me",
            msg: "Bari kokhon  Kothay tui akhono?",
            created_at: new Date(),
            updated_at: new Date()
        },
        
        ];
    
   // chat.insertMany(allchats);
   // Delete all existing data
    const Chat1 = async () =>{
    await chat.deleteMany({});
    console.log("Exixting Data was deleted successfully");
     chat.insertMany(allchats);
     console.log("New Data inserted successfully");
     console.log(allchats);
}

Chat1();