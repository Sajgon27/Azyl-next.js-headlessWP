import { useEffect, useState } from "react";
import axios from "axios";

interface Animal {
  id: number;
  name: string;
  age?: number;
  type?: string;
  main_image:string;
}

const useFetchAnimals = () => {
  
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/animals`,
      {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Fetched animals:", response.data);
        setAnimals(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { animals, loading, error };
};

export default useFetchAnimals;
