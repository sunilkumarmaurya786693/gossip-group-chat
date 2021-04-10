const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const { get } = require("lodash");

const checkAuthentication = require("./checkAuth.js");
const { passwordEncrptionNumber, jWT_SECRET_KEY } = require("./config.js");
require("./models/user");
require("./models/messages");
require("./models/group");

const User = mongoose.model("User");
const Message = mongoose.model("Message");
const Group = mongoose.model("Group");

// Root resolver
const resolvers = {
  Query: {
    get_messages: (_, _a, context) => {
      if (!checkAuthentication(context)) return null;
      return "Hello World!";
    },

    login: async (_, { email, password }) => {
      const savedUser = await User.findOne({ email: email });
      if (!savedUser) return null;

      const isMatched = await bcrypt.compare(password, savedUser.password);
      if (isMatched) {
        const { _id, user_name, email } = savedUser;
        const token = jwt.sign({ _id, user_name, email }, jWT_SECRET_KEY);
        return token;
      }
      return null;
    },
  },
  Mutation: {
      create_group: async(_, {group_name}, context) => {
        const userData = checkAuthentication(context);
        if (!userData) return null;
        const { _id, user_name, email } = userData;
        const user_id = _id;
        const userDetails= await User.findById(user_id);
        console.log('userDetails----------------', userDetails);
        if(userDetails.user_type === "admin"){
            const groupData = new Group({
                group_name,
                user_ids: [],
                message_ids: [],
                is_active: true,
            });
            await groupData.save();
            return true;
        }
        return false;
      },
    add_group_member: async(_, {group_id}, context) => {
        const userData = checkAuthentication(context);
        if (!userData) return null;
        const { _id, user_name, email } = userData;
        const user_id = _id;
        await Group.findByIdAndUpdate(group_id, {
            $addToSet: {
                user_ids: ObjectID(user_id)
            }
        })

        await User.findByIdAndUpdate(user_id, {
            $addToSet: {
                group_ids:ObjectID(group_id)
            },
          });
        return true;
    },
    add_message: async (_, { content, group_id }, context) => {
      const userData = checkAuthentication(context);
      if (!userData) return null;
      const { _id, user_name, email } = userData;
      const user_id = _id;
      const message = new Message({
        user_id: ObjectID(user_id),
        content: content,
        group_id: ObjectID(group_id),
      });
      const saveMessage = await message.save();

      if (saveMessage._id) {
        await User.findByIdAndUpdate(user_id, {
          $addToSet: {
              message_ids:ObjectID(saveMessage._id)
          },
        });
        await Group.findByIdAndUpdate(group_id, {
            $addToSet: {
                message_ids: ObjectID(saveMessage._id)
            }
        })
    }
    return true;
    },
    register: async (_, { user_name, email, password, user_type }) => {
      if (user_name && email && password) {
        const savedUser = await User.findOne({ email: email });
        if (savedUser) return null;
        const securedPassword = await bcrypt.hash(
          password,
          passwordEncrptionNumber
        );
        const user = new User({
          user_name,
          email,
          password: securedPassword,
          user_type,
          group_ids: [],
          message_ids: [],
        });
        await user.save();
        return user;
      } else {
        return res.status(422).json({ error: "please fill all the field" });
      }
    },
  },
};

module.exports = resolvers;
