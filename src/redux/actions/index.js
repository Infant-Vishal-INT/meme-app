export const clearPersistedData = () => {
  return {
    type: "CLEARPERSISTEDDATA",
  };
};

export const addFavMeme = (meme) => {
  return {
    type: "ADDFAVMEME",
    payload: meme,
  };
};

export const deleteFavMeme = (index) => {
  return {
    type: "DELETEFAVMEME",
    payload: index,
  };
};
