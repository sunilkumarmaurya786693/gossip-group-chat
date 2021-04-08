const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types
const MessageSchema = new mongoose.Schema({
    sender: {
        userId: {type:ObjectId, ref:"User"}
    },
    group: {
        groupId: {type: ObjectId, ref: "Group"}
    },
    message_content:{
        type:String
    },
    timestamps: { timestamps: true }
})

mongoose.model("Message", MessageSchema);
