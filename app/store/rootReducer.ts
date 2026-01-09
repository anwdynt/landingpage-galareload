import { combineReducers } from '@reduxjs/toolkit';
import editorReducer from './slices/editorSlice';
import postSettingsReducer from './slices/postSettingsSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
    editor: editorReducer,
    postSettings: postSettingsReducer,
    ui: uiReducer,
});

export default rootReducer;
