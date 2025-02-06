import { createAsyncThunk } from "@reduxjs/toolkit";

// Function to fetch users from the API
async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
}

// Create an async thunk to handle fetching users
export const fetchUsers = createAsyncThunk("users/fetchData", async () => {
  const users = await getUsers();
  return users; // Return users array as the action payload
});

// import { createAsyncThunk } from "@reduxjs/toolkit";
// async function getUsers() {
//   const response = await fetch("http://localhost:3000/users");
//   const users = await response.json();
//   return users;
// }

// export const fetchUsers = createAsyncThunk("users/fetchData", async () => {
//   const response = await getUsers();
//   return response;
// });
