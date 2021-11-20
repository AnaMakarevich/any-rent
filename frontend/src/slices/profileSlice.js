import { createSlice } from '@reduxjs/toolkit'
import { saveUserIdLocalStorage } from '../utils';


const initialState = {
    loading: true,
    isLoggedIn: false,
    userId:null,
    firstName:null,
    lastName:null,
    succesfulReturns:null,
    contractsCountConsumer:null,
    contractsCountProvider:null,
    level:null,
    coinsAmount:null,

}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logIn: (state, action) => {
        const {
            id,
            coins,
            first_name,
            last_name,
            successful_returns,
            num_current_contracts_consumer,
            num_current_contracts_provider,
            level,
        } = action.payload;

        state.isLoggedIn = true;
        state.userId = id;
        state.firstName = first_name;
        state.lastName = last_name;
        state.succesfulReturns = successful_returns;
        state.contractsCountConsumer = num_current_contracts_consumer;
        state.contractsCountProvider = num_current_contracts_provider;
        state.level = level;
        state.coinsAmount = coins;
        
        saveUserIdLocalStorage(state.userId);
    },
    simpleLogIn: (state, action) => {
        state.isLoggedIn = true;
        state.userId = action.payload;

        saveUserIdLocalStorage(state.userId);
    },
    logOut: (state) => {
        state.isLoggedIn = false;
        state.userId = null;
        state.firstName = null;
        state.lastName = null;
        state.succesfulReturns = null;
        state.contractsCountConsumer = null;
        state.contractsCountProvider = null;
        state.level = null;
        state.coinsAmount = null;
        
        saveUserIdLocalStorage(state.userId);
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    logIn,
    simpleLogIn,
    logOut,
     } = profileSlice.actions;

export const loadingSelector = state => state.profile.loading;
export const isLoggedInSelector = state => state.profile.isLoggedIn;
export const userIdSelector = state => state.profile.userId;
export const userFirstNameSelector = state => state.profile.firstName;
export const userSelector = state =>state.profile;
export default profileSlice.reducer