import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import thunk from 'redux-thunk';



const middleWare = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleWare));
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
