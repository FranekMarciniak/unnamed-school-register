import { IGlobalState } from "../../types/global";
import {
  SET_USER,
  ADD_ERROR,
  CLEAR_ERRORS,
  CLEAR_USER,
} from "../actions/types";
const emptyUser = {
  id: null,
  username: "",
  password: "",
  email: "",
  firstName: null,
  lastName: null,
  role: "",
  createdAt: "",
  updatedAt: "",
  group_id: null,
};
const initialState = {
  loading: false,
  errors: null,
  user: emptyUser,
};

const globalReducer = (state: IGlobalState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case CLEAR_USER:
      return { ...state, user: emptyUser };
    case ADD_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS: {
      return { ...state, errors: null };
    }
    default:
      return initialState;
  }
};
export default globalReducer;
