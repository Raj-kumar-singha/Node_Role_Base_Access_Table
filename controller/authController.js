const User = require("../models/index").user,
  bcrypt = require('bcryptjs'),
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
  
        if (!(user && (await bcrypt.compare(password, user.password)))) {
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
            expiresIn: "2h",
          }
        );
  
        // Return user and token
        res.status(200).json({ user, token });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
      }
    };
  };
  
  module.exports = new Auth();