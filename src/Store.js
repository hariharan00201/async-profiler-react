import { collapsedReducer } from "./reducers/CollapsedReducers";
import { createStore, combineReducers} from 'redux';
import { applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { flameReducer } from "./reducers/FlameReducers";
import { jfrDataReducer, statefulJFRReducer } from "./reducers/StatefulJFRReducers";


const reducerList = combineReducers({
    collapsedData : collapsedReducer,
    flameData : flameReducer,
    jfrData : statefulJFRReducer,
    jfrViewData: jfrDataReducer
  });

  const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
  
const store = createStore(reducerList,composedEnhancer);

export default store;