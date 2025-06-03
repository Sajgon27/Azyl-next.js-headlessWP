import {  useState } from "react";
import axios from "axios";


interface Animal {
  id: number;
  name: string;
  age?: number;
  type?: string;
  
}
const API_BASE_URL ='http://127.0.0.1:8000/api';

console.log(API_BASE_URL);

const useAddAnimal = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const addAnimal = async (formData:any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/animals`, formData);
            setAnimals(response.data);
            return response.data;
        } catch (err:any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

  return {addAnimal, animals, loading, error };
};

export default useAddAnimal;
