import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

export default function useFetch(cb, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fetchData = async (...args) => {
    setLoading(true);
    console.log("fetching data...");
    try {
      const supabaseToken = await session?.getToken({
        template: "supabase",
      });
      const response = await cb(supabaseToken, options, ...args);
      setData(response);
      console.log(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      console.log("data fetched...");
    }
  };

  return { data, loading, error, fetchData };
}
