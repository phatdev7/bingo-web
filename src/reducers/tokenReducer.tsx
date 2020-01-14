export const UPDATE_TOKEN = 'UPDATE_TOKEN';

const initialState = {
  token: '',
};

const mapActions: any = {
  [UPDATE_TOKEN]: (state: any, payload: any) => ({
    token: payload,
  }),
};

const reducer = (state = initialState, action: any) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
