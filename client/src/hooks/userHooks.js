import { useState, useEffect } from "react";

const useLoggedInUser=()=> {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
}
export default useLoggedInUser
