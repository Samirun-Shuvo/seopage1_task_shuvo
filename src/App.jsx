import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is imported
import Table from "./components/Table";
import BarChart from "./components/BarChart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://erp.seopage1.net/api/leads");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">Table Data</h1>


      <DndProvider backend={HTML5Backend}>
        <div>
          <Table data={data} /> {/* Passing data to Table component */}
        </div>
      </DndProvider>


      <h1 className="text-4xl font-bold mb-10">Bar-Chart Data</h1>
      <div>
        <BarChart data={data} /> {/* Passing data to Barchart component if necessary */}
      </div>
    </div>
  );
};

export default App;
