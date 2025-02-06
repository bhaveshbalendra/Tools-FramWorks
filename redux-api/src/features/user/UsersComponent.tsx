import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./UserApi";
import { RootState, AppDispatch } from "../../app/store"; // Import AppDispatch

function UsersComponent() {
  const dispatch: AppDispatch = useDispatch(); // Type dispatch with AppDispatch
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch fetchUsers to load data
  }, [dispatch]);

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

export default UsersComponent;

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchUsers } from "./UserApi";
// import { UserSlice } from "./UserSlice";
// import { RootState } from "../../app/store";

// function UsersComponent() {
//   const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.users);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   return (
//     <div>
//       {users &&
//         users.map((user: UserSlice) => (
//           <div key={user.id}>
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default UsersComponent;
