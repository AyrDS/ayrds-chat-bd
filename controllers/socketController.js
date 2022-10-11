const User = require('../models/userModel');
const Message = require('../models/messageModel');

const userConnect = async (uid) => {
   const user = await User.findById(uid);
   user.online = true;
   await user.save();

   return user;
}

const userDisconnect = async (uid) => {
   const user = await User.findById(uid);
   user.online = false;
   await user.save();

   return user;
}

const getUsers = async () => {

   const users = await User
      .find()
      .sort('-online');

   return users;
}

const saveMsg = async (payload) => {

   try {
      const msg = new Message(payload);
      await msg.save();

      return msg;
   } catch (error) {
      console.log(error);
      return false;
   }
}


module.exports = {
   getUsers,
   saveMsg,
   userConnect,
   userDisconnect,
}
