import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userObj = JSON.parse(localStorage.getItem("userSaika"));
const isLoggedIn = userObj ? true : false;

//kondisi pertama
const initialState = {
  isLoggedIn: isLoggedIn,
  user: userObj?.user,
  status: "idle",
  error: null,
};

// console.lof(initialState);
export const login = createAsyncThunk("/login", async (credential) => {
  const data = credential;
  localStorage.setItem("userSaika", JSON.stringify(data));
  return data;
});

const userSlice = createSlice({
  name: "userSaika",
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = "idle";
    },
    logout(state, action) {
      localStorage.removeItem("userSaika");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { statusReset, logout } = userSlice.actions;
export default userSlice.reducer;
