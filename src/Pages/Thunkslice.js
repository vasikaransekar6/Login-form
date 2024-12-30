import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for users
const initialState = {
  users: [],
  load: false,
  error: ''
};

// Async thunk to add a user
export const adduser = createAsyncThunk(
  "users/adduser",
  async (data, { rejectWithValue }) => {
    try {
      let res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data,profile:''}),
      });

      if (res.ok) {
        let responseData = await res.json();
        return responseData;
      } else {
        return rejectWithValue({ error: "Data could not be added" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk to update a user
export const updateuser = createAsyncThunk(
  "users/updateuser",
  async ({ dp, id }, { rejectWithValue }) => {
    try {
      let res = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dp),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return rejectWithValue({ error: "Data could not be updated" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// Users slice
export const userslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling pending, fulfilled, and rejected cases for adduser
      .addCase(adduser.pending, (state) => {
        state.load = true;
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new user to the array
        state.load = false;
      })
      .addCase(adduser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.load = false;
      })
      
      .addCase(updateuser.pending, (state) => {
        state.load = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; 
        }
        state.load = false;
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.load = false;
      });
  },
});

export default userslice.reducer;
