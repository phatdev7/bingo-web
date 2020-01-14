export const UPDATE_ROOM = 'UPDATE_ROOM';
export const ADD_ROOM = 'ADD_ROOM';

const initialState = {
  current: [],
};

const mapActions: any = {
  [UPDATE_ROOM]: (state: any, payload: any) => ({
    current: payload,
  }),
  [ADD_ROOM]: (state: any, payload: any) => ({
    current: [...state.current, payload],
  }),
};

const reducer = (state = initialState, action: any) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
