const { User, Post, Comment } = require('../models');

const userController = {

    // signs up the user 
    signup: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
          
                res.json({ user: newUser, message: "Sign up complete" });
              });
        } catch (err) {
            res.status(400).json(err);
        }
    },
    
    // Checks the bcrypt password to log in user
    login:  async (req, res) => {
    try {
      const userData = await User.findOne({
        where: { userName: req.body.userName },
      });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: "Incorrect credentials, please try again" });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect credentials, please try again" });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: "You are now logged in!" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },

    // Logs the user out by destroying the session
    logout: async (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};

module.exports = userController