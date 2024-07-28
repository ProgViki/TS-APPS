
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { User, fetchUsers, userSelector } from "./userSlice";
// import "./user.css";
// import { createAsyncThunk } from '@reduxjs/toolkit';

function UserPage() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedUsers = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setLoading(selectedUsers.loading);
    setError(selectedUsers.error);
    setUsers(selectedUsers.users);
  }, [selectedUsers]);

  function handleFetchUser() {
    dispatch(fetchUsers());
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {users?.map((user) => (
        <li key={user.id}>
          {user.id} | {user.name} | {user.email}
        </li>
      ))}
      <button className="btn" onClick={handleFetchUser}>Fetch</button>
    </div>
  );
}
export default UserPage;