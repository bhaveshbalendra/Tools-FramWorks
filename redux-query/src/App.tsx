import { useEffect } from "react";
import { useGetUSerQuery } from "./app/user/userSlice";

function App() {
  const { data, error, isLoading } = useGetUSerQuery(null);

  return (
    <div>{/* <p>{isLoading ? "Loading" : "Data ready"}</p> */}this is rtk</div>
  );
}

export default App;
