const { User, Post, Comment } = require('../models');

const userController = {

    // signs up the user 
    signup: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
          
                res.status(200).json({ user: newUser, message: "Sign up complete" });
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
  
        res.status(200).json({ user: userData, message: "You are now logged in!" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },

    // Logs the user out by destroying the session
    logout: async (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(0).end();
      });
    } else {
      res.status(404).end();
    }
  },

//   get all the users from the database and their posts
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'title', 'content'],
                    }
                ],
            });
            res.status(200).json(users); 
        } catch (err) {
            res.status(500).json(err);
        }
    },

// get a single user from the databse and the users posts
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] }, 
                include: [
                    {
                        model: Post,
                        attributes: ['id', 'title', 'content'],
                    }
                ],
            });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.status(200).json(user); 
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController