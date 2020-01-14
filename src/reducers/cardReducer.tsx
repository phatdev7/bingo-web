export const UPDATE_CARD = 'UPDATE_CARD';

const initialState = {
  cards: [],
};

const mapActions: any = {
  [UPDATE_CARD]: (state: any, payload: any) => ({
    cards: payload,
  }),
};

const reducer = (state = initialState, action: any) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
