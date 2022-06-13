import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthApi } from '../api/Auth.api';
import { LoginRequest } from '../api/Auth.dto';
import { SecondaryHttpClient } from '../api/SecondaryHttpClient';
import { RequestStatus } from '../model/RequestStatus';
import { RegisterRequest } from './../api/Auth.dto';
import { HttpClient } from './../api/HttpClient';

// TODO error message should be separate for signIn and signUp processes
export interface AuthState {
  errorMessage?: string;
  status: RequestStatus;
  token?: string;
  userId?: number;
}

const initialState: AuthState = {
  status: RequestStatus.Pending,
};

export const signIn = createAsyncThunk('auth/signIn', async (data: LoginRequest) => {
  const response = await AuthApi.signIn(data);

  return response;
});

export const signUp = createAsyncThunk('auth/signUp', async (data: RegisterRequest) => {
  await AuthApi.signUp(data);
  const response = await AuthApi.signIn({
    email: data.email,
    password: data.password,
  });

  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      delete state.token;
      delete state.userId;
      HttpClient.clearToken();
      SecondaryHttpClient.clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.errorMessage = undefined;
        state.status = RequestStatus.Loading;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.errorMessage = action.error.message;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.session_key;
        state.userId = action.payload.user_id;
        HttpClient.setToken(action.payload.session_key);
        SecondaryHttpClient.setToken(action.payload.session_key);
        state.status = RequestStatus.Successful;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.errorMessage = undefined;
        state.status = RequestStatus.Loading;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.errorMessage = action.error.message;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.session_key;
        state.userId = action.payload.user_id;
        HttpClient.setToken(action.payload.session_key);
        SecondaryHttpClient.setToken(action.payload.session_key);
        state.status = RequestStatus.Successful;
      });
  },
});

export function getIsAuthorized(state: AuthState): boolean {
  return Boolean(state.token && state.userId);
}
