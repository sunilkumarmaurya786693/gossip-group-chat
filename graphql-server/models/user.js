const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types
const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: false
    },
    groups: [
        {
             groupId: {type:ObjectId,ref:"Group"}
        }
    ],
    messages: [
        {
            messageId: {type:ObjectId,ref="Message"}
        }
    ]
})

mongoose.model("User",userSchema);
