import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  refreshToken: string;
  expiresIn: string;
  expirationDate: number;
}

interface UserState {
  loading: boolean;
  error: string | undefined;
  userData: {
    email: string;
    refreshToken: string;
    expiresIn: string;
    displayName?: string,
    expirationDate:number,
  };
}


const initialState:UserState = {
  loading: false,
   
  error: '',
  userData: {
    email: '',
    refreshToken: '',
    expiresIn: '',
    expirationDate: 0
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
  
  const tokenExpiration:number = new Date().getTime() + 50000;

  const data: UserPayload = {
    email: responseData.data.email,
    refreshToken: responseData.data.refreshToken,
    expiresIn: responseData.data.expiresIn,
    expirationDate: tokenExpiration
  };
  return data;
});


export const checkUserLoggedState = createAsyncThunk('user/checkLoggedState',(userInfo:UserPayload) => {
  
    let logoutTimer;
    if(userInfo) {
      const remainingTime = userInfo.expirationDate - new Date().getTime()
      logoutTimer = setTimeout(()=>{
        localStorage.removeItem("user")
      },remainingTime)
    }else{
      clearTimeout(logoutTimer);
    }
  })


export const login = createAsyncThunk<UserPayload,UserSign,{rejectValue: Error}>('user/login', async(loginInfo:UserSign) => {
  const responseData = await axios.post(
    loginInfo.url,
    loginInfo.userData,
    loginInfo.headers
  )
  const tokenExpiration:number = new Date().getTime() + 50000;

  const data:UserPayload = {
    email: responseData.data.email,
    refreshToken: responseData.data.refreshToken,
    expiresIn: responseData.data.expiresIn,
    expirationDate: tokenExpiration
  }
  return data;
}) 

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedin(state:UserState,action:PayloadAction<UserState["userData"]>) {
      state.userData = {
        email: action.payload.email,
        refreshToken:action.payload.email,
        expiresIn:action.payload.expiresIn,
        expirationDate: new Date().getTime() + 50000
      }
    },
    logout(state:UserState){
      localStorage.removeItem("user")
      state.error = undefined;
      state.loading = false;
      state.userData = {
        email: '',
        refreshToken: '',
        expiresIn: '',
        expirationDate: 0
      }
    },
  
  },
  extraReducers: (builder) => {
    builder.addCase(userSign.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      localStorage.setItem("user",JSON.stringify(action.payload))
    })
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


    builder.addCase(login.fulfilled,(state,action) => {
      state.loading = false;
      state.userData = action.payload
      localStorage.setItem("user",JSON.stringify(action.payload))
      
    })
    builder.addCase(login.pending, (state,action) => {
      state.loading = true
    })
    builder.addCase(login.rejected, (state,action) => {
      state.loading = false;
      if(action.payload) {
        state.error = action.payload.message;
      }else{
        state.error = "알 수 없는 오류로 인해 로그인에 실패하였습니다."
      }
    })
    builder.addCase(checkUserLoggedState.fulfilled,(state,action) => {

    })
  },
});

export const userSignReducer = userSlice.reducer;
export const {logout,loggedin} = userSlice.actions;