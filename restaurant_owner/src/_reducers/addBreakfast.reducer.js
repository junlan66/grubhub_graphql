import { menuConstants } from "../_constants";

export function addBreakfast(state = {}, action) {
  switch (action.type) {
    case menuConstants.MENU_ADD_REQUEST:
      return { addingBreakfast: true };
    case menuConstants.MENU_ADD_SUCCESS:
      return {};
    case menuConstants.MENU_ADD_FAILURE:
      return {};
    default:
      return state;
  }
}
