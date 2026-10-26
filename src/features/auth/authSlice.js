
import { createSlice } from "@reduxjs/toolkit";

import {
  loadCustomer,
  saveCustomer,
  clearCustomer,
  loadCustomerToken,
  saveCustomerToken,
  loadAdmin,
  saveAdmin,
  clearAdmin,
  loadAdminToken,
  saveAdminToken,
} from "./authStorage";

const initialState = {
  customer: loadCustomer(),
  customerToken: loadCustomerToken(),
  admin: loadAdmin(),
  adminToken: loadAdminToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCustomerSession(state, action) {
      const { customer, token = null } = action.payload || {};

      state.customer = customer || null;
      state.customerToken = token;

      if (customer) {
        saveCustomer(customer);
      } else {
        clearCustomer();
      }

      if (token) {
        saveCustomerToken(token);
      }
    },

    updateCustomer(state, action) {
      if (!state.customer) {
        return;
      }

      state.customer = {
        ...state.customer,
        ...action.payload,
      };

      saveCustomer(state.customer);
    },

    logoutCustomer(state) {
      state.customer = null;
      state.customerToken = null;
      clearCustomer();
    },

    setAdminSession(state, action) {
      const { admin, token } = action.payload || {};

      state.admin = admin || null;
      state.adminToken = token || null;

      if (admin && token) {
        saveAdmin(admin);
        saveAdminToken(token);
      } else {
        clearAdmin();
      }
    },

    updateAdmin(state, action) {
      if (!state.admin) {
        return;
      }

      state.admin = {
        ...state.admin,
        ...action.payload,
      };

      saveAdmin(state.admin);
    },

    logoutAdmin(state) {
      state.admin = null;
      state.adminToken = null;
      clearAdmin();
    },

    logoutAll(state) {
      state.customer = null;
      state.customerToken = null;
      state.admin = null;
      state.adminToken = null;

      clearCustomer();
      clearAdmin();
    },
  },
});

export const {
  setCustomerSession,
  updateCustomer,
  logoutCustomer,
  setAdminSession,
  updateAdmin,
  logoutAdmin,
  logoutAll,
} = authSlice.actions;

export const selectCustomer = (state) => state.auth.customer;

export const selectCustomerToken = (state) =>
  state.auth.customerToken;

export const selectIsCustomerLoggedIn = (state) =>
  Boolean(state.auth.customer && state.auth.customerToken);

export const selectAdmin = (state) => state.auth.admin;

export const selectAdminToken = (state) => state.auth.adminToken;

export const selectIsAdminLoggedIn = (state) =>
  Boolean(state.auth.admin && state.auth.adminToken);

export default authSlice.reducer;
