import User from '../models/user.js';
import bcrypt from 'bcryptjs';
const createUser = async (req, res) => {

  const { name, email, password } = req.body;

  const plainPassword = req.body.password;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export default createUser;
