const User = require("../models/index").user;

let myUser = function () {
this.createUser = async(req, res) => {
  try {
    const { name, role, email, password } = req.body;
    // Implement user creation logic based on role
    // Example: Only Super Admin can create all user roles
    if (req.user.role === 'superadmin') {
      const newUser = await User.create({ name, role, email, password });
      res.status(201).json(newUser);
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

this.getUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // Implement user retrieval logic based on role
    // Example: Super Admin and Admin can retrieve user details
    if (req.user.role === 'superadmin' || req.user.role === 'admin') {
      res.status(200).json(user);
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

this.updateUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const { name, role, email, password } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // Implement user update logic based on role
    // Example: Only Super Admin can update user roles
    if (req.user.role === 'superadmin') {
      await user.update({ name, role, email, password });
      res.status(200).json(user);
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

this.deleteUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // Implement user deletion logic based on role
    // Example: Only Super Admin can delete users
    if (req.user.role === 'superadmin') {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
}

module.exports = new myUser();
