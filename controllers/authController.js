const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/generateJWT');
const User = require('../models/userModel');

const newUser = async (req, res) => {

   try {
      const { email, password } = req.body;

      const existEmail = await User.findOne({ email });

      if (existEmail) {
         return res.status(400).json({
            ok: false,
            msg: 'El email ya se encuentra registrado'
         });
      }

      const user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      const token = await generateJWT(user.id);

      res.status(201).json({
         user,
         token
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: '¡Error inesperado!'
      });
   }
}

const login = async (req, res) => {

   const { email, password } = req.body;

   try {
      const userDB = await User.findOne({ email });
      if (!userDB) {
         return res.status(404).json({
            ok: false,
            msg: 'Email o contraseña incorrectas'
         });
      }

      const validPassword = bcrypt.compareSync(password, userDB.password);
      if (!validPassword) {
         return res.status(404).json({
            ok: false,
            msg: 'Email o contraseña incorrectas'
         });
      }

      const token = await generateJWT(userDB.id);

      res.json({
         ok: true,
         user: userDB,
         token
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: '¡Error inesperado!'
      });
   }

}

const renew = async (req, res) => {

   const uid = req.uid;
   const token = await generateJWT(uid);

   const user = await User.findById(uid);

   res.json({
      ok: true,
      user,
      token,
   });

}

module.exports = {
   newUser,
   login,
   renew
}
