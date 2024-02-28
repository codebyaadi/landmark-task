import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Card from "./card";

const Container = () => {
  const query = useQuery({
    queryKey: ["system-data"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8080/fetchdata");
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    }
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100 font-prompt">
      <Card data={query.data} />
    </div>
  );
};

export default Container;
