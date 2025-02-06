import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./UserApi";

// Define the user-related types
export interface User {
  id: number | null;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Define initial state as an empty array of users
const initialState: User[] = [];

// Create the users slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload; // Replace state with fetched users
    });
  },
});

// Export the addUser action
export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { fetchUsers } from "./UserApi";

// export interface UserSlice {
//   id: number | null;
//   name: string;
//   username: string;
//   email: string;
//   address: Address;
//   phone: string;
//   website: string;
//   company: Company;
// }

// export interface Address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: Geo;
// }

// export interface Geo {
//   lat: string;
//   lng: string;
// }

// export interface Company {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// }

// const initialState: UserSlice[] = [
//   {
//     id: null, // or null, based on your preference
//     name: "",
//     username: "",
//     email: "",
//     address: {
//       street: "",
//       suite: "",
//       city: "",
//       zipcode: "",
//       geo: {
//         lat: "",
//         lng: "",
//       },
//     },
//     phone: "",
//     website: "",
//     company: {
//       name: "",
//       catchPhrase: "",
//       bs: "",
//     },
//   },
// ];

// export const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     addUser: (state, action) => {
//       state.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchUsers.fulfilled, (_state, action) => {
//       return action.payload;
//     });
//   },
// });

// export const { addUser } = usersSlice.actions;

// export default usersSlice.reducer;
