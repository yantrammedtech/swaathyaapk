import { createStore } from "redux";

const initialData ={
    currentUserData:null,
    profileUserData:null
}

function Reducer(state=initialData,action){
    switch(action.type){
        case "currentUserData":
            return {...state,currentUserData:action.payload};
        case "profileUserData":
            return {...state,profileUserData:action.payload};
        
        default:
            return state
    }

}

const store = createStore(Reducer);

export default store;


// import { createStore } from 'redux';
// import axios from 'axios';


// const login = localStorage.getItem('isLogin');


// let initialState = {
//   isUserLogin: login,
//   userid:'',
//   allProducts: [],
//   apiStatus: false,
//   cartListData: [],
// };

// async function getUserCartList(dispatch) {
//   try {
//     const token = localStorage.getItem('userToken');
//     const userid = localStorage.getItem('userid');
    
//     if (token && userid) {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/userCart/items`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             userid,  // Pass userid as a query parameter
//           },
//         }
//       );

//       // Dispatch an action to update cartListData in the Redux store
//       dispatch({ type: 'cartItems', payload: res.data.data });
//     }
//   } catch (error) {
//     // Handle error if needed
//     console.error('Error fetching user cart items:', error);
//   }
// }


// // Create a store with the reducer
// function storeReducer(state = initialState, action) {
  
//   switch (action.type) {
//     case 'Login':
//       return { ...state, isUserLogin: action.payload };
//     case 'addProducts':
//       return { ...state, allProducts: action.payload };
//     case 'apiStatus':
//       return { ...state, apiStatus: action.payload };
//     case 'userid':
//       return { ...state, userid: action.payload };
//     case 'cartItems':
//       // Update cartListData with the payload from the action
//       return { ...state, cartListData: action.payload };
//     default:
//       return state;
//   }
// }

// // Create the Redux store
// const store = createStore(storeReducer);

// // Call the getUserCartList function with the dispatch function from the store
// getUserCartList(store.dispatch);

// export default store;