import { createContext ,useEffect,useState} from "react";
const [data, setData] = useState(null);
const fetch = async () => {
    let res = await axios.post("http://localhost:5000/blogs", {
      id: process.env.id,
    });
    setData(res.data);
    console.log(res);
  };
  useEffect(() => {
    fetch();
  }, []);
const DataProviding = createContext(data);

export { DataProviding };
