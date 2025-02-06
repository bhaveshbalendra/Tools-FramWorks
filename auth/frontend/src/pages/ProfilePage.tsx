import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/profile", {
          withCredentials: true, // This will send cookies with the request
        });

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        setError(`${error}`);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Profile Page</h1>
          {user ? (
            <div>
              <p>Username</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}
