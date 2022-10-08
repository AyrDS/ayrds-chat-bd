
const newUser = async (req, res) => {
   res.json({
      ok: true,
      user: 'abc123'
   });

}

const login = async (req, res) => {

   const body = req.body;

   res.json({
      ok: true,
      ...body
   });

}

const renew = async (req, res) => {
   res.json({
      ok: true,
      user: 'renew'
   });

}

module.exports = {
   newUser,
   login,
   renew
}
