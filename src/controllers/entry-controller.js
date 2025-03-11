import {insertEntry, selectEntryById, selectEntriesByUserId } from '../models/entry-model.js';

const postEntry = async (req, res, next) => {
  // user_id, entry_Pvm, Fiilis, Paino, Uni_tuntia, Huomio
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  try {
    await insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(error);
  }
};

const EntriesByUserId = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId (req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};


/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  console.log("terve" + req.user.user_id)
  try {
    const entries = await selectEntryById(req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

export {postEntry, getEntries, EntriesByUserId}; 