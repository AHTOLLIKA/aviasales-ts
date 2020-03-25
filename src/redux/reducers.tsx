import { handleActions } from 'redux-actions';
import * as actions from './actions';

const searchId = handleActions(
  {
    [actions.setSearchId.toString()](state, { payload }) {
      return payload;
    },
  },
  ''
);

export default searchId;
