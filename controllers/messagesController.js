const Message = require('../models/messageModel');



const getChat = async (req, res) => {

   const myUid = req.uid;
   const msgFrom = req.params.from;

   const last30 = await Message.find({
      $or: [
         { from: myUid, to: msgFrom },
         { from: msgFrom, to: myUid },
      ]
   })
      .sort({ createdAt: 'asc' })
      .limit(30);



   res.json({
      ok: true,
      messages: last30
   });

}

module.exports = {
   getChat
};
