const initialState = {
  favMemeArr: [],
};

const FavMemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDFAVMEME":
      return {
        ...state,
        favMemeArr: [...state.favMemeArr, action.payload],
      };
    case "DELETEFAVMEME":
      return {
        ...state,
        favMemeArr: [
          ...state.favMemeArr.slice(0, action.payload),
          ...state.favMemeArr.slice(action.payload + 1),
        ],
      };
    case "CLEARPERSISTEDDATA":
      return initialState;
    default:
      return state;
  }
};

export default FavMemeReducer;
