import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { insertUser, selectAllUsers, selectUserById } from '../models/user-model.js';
import { customError } from '../middlewares/error-handler.js';

const users = []; // Lisää tämä, jos et käytä tietokantaa

// Kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  const users = await selectAllUsers();
  res.json(users);
};

// Käyttäjän haku ID:n perusteella
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// Käyttäjän lisäys
const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { username, password: hashedPassword, email };
  
  try {
    const result = await insertUser(newUser);
    res.status(201).json({ message: 'User added. id: ' + result });
  } catch (error) {
    next(customError(error.message, 400));
  }
};

// Käyttäjän muokkaus
const editUser = (req, res) => {
  console.log('editUser request body', req.body);
  const user = users.find((user) => user.id == req.params.id);
  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    res.json({ message: 'User updated.' });
  } else {
    res.status(404).json
  }
};
export {getUsers, getUserById ,addUser, editUser,};
