import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const getAllData = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:8080/getdata");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    getAllData();
  }, []);

  return <></>;
}

export default App;
