import { useEffect, useState } from "react";
import axios from "axios";
import { catsApi } from "../helpers/Api";

const useCategories = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(catsApi);
      setCategories(data.categories);
      setLoading(false);
      // console.log(data, "categories data");
    } catch (error) {
      setLoading(false);
      console.error("categrioes error", error);
    }
  };

  useEffect(() => {fetchCategory() }, []);
  
  return {
     categories, 
    loading }
};

export default useCategories;
