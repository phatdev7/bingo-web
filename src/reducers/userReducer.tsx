export const UPDATE_USER = 'UPDATE_USER';

const initialState = {};

const mapActions: any = {
  [UPDATE_USER]: (state: any, payload: any) => payload,
};

const reducer = (state = initialState, action: any) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
