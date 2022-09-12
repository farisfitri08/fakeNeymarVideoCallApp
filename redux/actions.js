export const SET_USER_NAME = "SET_USER_NAME";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
