const User = require("../models/userModel");
const bcrypt = require('bcrypt')
module.exports = {
  get: (req, res) => {
    const sU = true;
    res.render("back", { sU });
  },

  post: async (req, res) => {
    const password = req.body.password;
    const conPassword = req.body.confPassword;
    if (password === "") {
      const sU = true;
      const error = "Un mot de passe est recquis";
      res.render("register", { error, sU });
    } else {
      if (password !== conPassword) {
        const error = "La confirmation du mot de passe n'est pas correct";
        res.render("register", { error, sU });
      } else {
        await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
        });
        res.redirect("/");
      }
    }
  },
  getSignIn: async (req, res) => {
    const iD = true
    res.render("login", {iD});
  },
  postSignIn: async(req, res) => {
    //chercher l'utilisateur qui cherche à se connecter
    const user = await User.findOne({where:{email: req.body.email}, raw:true })
        if (!user) {
            res.redirect('back')
        } else {
            bcrypt.compare(req.body.password, user.password, (err, same)=>{
                if (!same) {
                    res.redirect('back')
                } else {
                    console.log(user.firstName);
                    req.session.userPk = user.id
                    req.session.firstName = user.firstName
                    console.log(req.session);
                    res.redirect('/')
                }
            })
}
    
},


};
