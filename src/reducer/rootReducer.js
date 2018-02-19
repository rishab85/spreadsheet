import {combineReducers} from 'redux';
import {modifiedData, modifiedStyle, buttonName, buttonClicked, currentSelection} from './tableReducer';

export default combineReducers({
  modifiedData,
  modifiedStyle,
  buttonName,
  buttonClicked,
  currentSelection
})
