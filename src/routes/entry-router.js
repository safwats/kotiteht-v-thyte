import express from 'express';
import {getEntries, postEntry, EntriesByUserId} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_pvm').notEmpty().isDate(),
    body('fiilis').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('paino').isFloat({min: 2, max: 200}),
    body('uni_tuntia').isInt({min: 0, max: 24}),
    //body('notes').isLength({min: 0, max: 1500}).escape(),
    body('notes').trim().escape().custom((value, {req}) => {
      // customvalidointiesimerkki: jos sisältö sama kuin mood-kentässä
      // -> ei mee läpi
      // https://express-validator.github.io/docs/guides/customizing#implementing-a-custom-validator
      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);
  entryRouter.get('/entries',authenticateToken , EntriesByUserId)
export default entryRouter;