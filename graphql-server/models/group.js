const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types
const GroupSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    createdTimeStamp: {
        type: String
    },
    members: [
        {
            userId: {type:ObjectId, ref:"User"}
        }
    ],
    messages: [
        {
            messageId: {type:ObjectId,ref="Message"}
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
})

mongoose.model("Group", GroupSchema);
