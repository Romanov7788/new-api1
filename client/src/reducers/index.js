import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))






// import {applyMiddleware, combineReducers, createStore} from "redux";
// import {composeWithDevTools } from 'redux-devtools-extension'
// import thunk from "redux-thunk";
// import userReducer from "./userReducer";
// import fileReducer from "./fileReducer";


// const rootReducer = combineReducers({
//     user: userReducer,
//     files: fileReducer,
// })

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



// const initialState = {
//     counter:0
// }

// function rootReducer(state = initialState, action){

//     switch(action.type){
//         case 'INCREMENT' :
//             return { counter: state.counter + 1}
//             case 'DECREMENT' :
//                 return { counter: state.counter - 1}
//                 default:
//                     return state;
//     }
// }