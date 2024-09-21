import { createSlice } from "@reduxjs/toolkit";
import { NavItems } from "../types/index.type";

interface IUISlice {
  isHamburgerMenuOpen: boolean;
  hamburgerMenuNavItems: NavItems[];
}

const initialState: IUISlice = {
  isHamburgerMenuOpen: false,
  hamburgerMenuNavItems: [],
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    openHamburgerMenu: (state) => {
      state.isHamburgerMenuOpen = true;
    },

    closeHamburgerMenu: (state) => {
      state.isHamburgerMenuOpen = false;
    },

    setHamburgerMenuNavItems: (state, actions) => {
      state.hamburgerMenuNavItems = actions.payload;
    },
  },
});

export const {
  openHamburgerMenu,
  closeHamburgerMenu,
  setHamburgerMenuNavItems,
} = uiSlice.actions;
const uiReducer = uiSlice.reducer;
export default uiReducer;
