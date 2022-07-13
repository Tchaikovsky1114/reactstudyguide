import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


interface UserSign {
  url: string;
  userData: {
    email: string;
    password: string;
    returnSecureToken: boolean
  };
  headers: {
    [key: string]: string;
  };
}
export interface UserPayload {
  email: string;
  idToken: string;
  expiresIn: string;
}

interface UserState {
  loading: boolean;
  error: string | undefined;
  userData: {
    email: string;
    idToken: string;
    expiresIn: string;
  };
}

const initialState:UserState = {
  loading: false,
  error: '',
  userData: {
    email: '',
    idToken: '',
    expiresIn: '',
  },
};

export const userSign = createAsyncThunk<
  UserPayload,
  UserSign,
  { rejectValue: Error }
>('user/signup', async (signupInfo: UserSign) => {
  const responseData = await axios.post(
    signupInfo.url,
    signupInfo.userData,
    signupInfo.headers
  );

  const data: UserPayload = {
    email: responseData.data.email,
    idToken: responseData.data.idToken,
    expiresIn: responseData.data.expiresIn,
  };
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSign.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });

    builder.addCase(userSign.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.error = action.payload.message;
      } else {
        state.loading = false;
        state.error = 'something wrong';
      }
    });

    builder.addCase(userSign.pending, (state, action) => {
      state.loading = true
    });
  },
});

export const userSignReducer = userSlice.reducer;