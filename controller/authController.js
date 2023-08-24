const User = require("../models/index").user,
  sessionModel = require("../models/index").sessionLog,
  bcrypt = require('bcryptjs'),
  sessionController = require('./sessionController'),
  jwt = require("jsonwebtoken");


let Auth = function () {
    //! USER REGISTER
    this.createUser = async (req, res) => {
      try {
        const { name, email, role, password } = req.body;
  
        // Validate user input
        if (!(email && password && name && role)) {
          return res.status(400).send("All input is required");
        }
        //  Check if user exists in our database
        const oldUser = await User.findOne({ where: { email: email } });
        console.log("==========> old", oldUser);

        if (oldUser) {
          return res.status(409).send("User Already Exists. Please Login");
        }
        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
  
        // Create user in our database
        const user = await User.create({
          name,
          role,
          email: email.toLowerCase(),
          password: encryptedPassword,
        });
        console.log("===========>user", user);
  
        // Return user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
      }
    };
  
    //! USER LOGIN
    this.login = async (req, res) => {
      try {
        // Get user input
        const { email, password } = req.body;
  
        // Validate user input
        if (!(email && password)) {
          return res.status(400).send("All input is required");
        }
        // Validate if user exists in our database
        const user = await User.findOne({
          where: { email },
        });

        // Password Validate: -
        const passwordIsValid = bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }else if(!(user && passwordIsValid)) {
          return res.status(400).send("Invalid Credentials");
        }

        // Create token
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          process.env.JWT_SECRET,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: "2h",
          }
        );
        req.session.token = token;

        // Return user and token
        res.status(200).json({ user, token });
        return createSession({token, name: user.name, email: user.email});
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
      }
    };

    
    let createSession = (data) => {
      return sessionController.createSessionLog({
          token: data.token,
          name: data.name,
          email: data.email,
          login_at: new Date()
      });
  }


  //! LOGOUT API: -
  this.logout = async (req, res) => {
    try {
        if(req.session = null){
          sessionController.updateSessionLog({
            logout_at: new Date(),
            where: {token}
          
          })
        }
        res.status(200).json({
            message: "You've been signed out!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
    }
};

// const updateSessionLogout = async (email) => {
//     try {
//         await sessionController.updateSessionLog({
//             email: email,
//             logout_at: new Date()
//         });
//     } catch (error) {
//         console.log("Error updating session:", error);
//         throw error;
//     }
// };

  // let updateSession = (data) => {
  //   return sessionController.updateSessionLog({
  //     logout_at: new Date()
  //   });
  // };  
};
  
module.exports = new Auth();