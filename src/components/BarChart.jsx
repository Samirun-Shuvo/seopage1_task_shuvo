import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null); // Store the Chart.js instance
  const canvasRef = useRef(null); // Reference to the canvas element

  // Helper function to chunk data
  const chunkData = (data, chunkSize) => {
    const result = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      result.push(data.slice(i, i + chunkSize));
    }
    return result;
  };

  // Count deal_status in each chunk
  const countDealStatus = (chunk) => {
    let count = { converted: 0, notConverted: 0 };
    chunk.forEach(item => {
      if (item.deal_status !== 0) {
        count.converted += 1;
      } else {
        count.notConverted += 1;
      }
    });
    return count;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the old chart before creating a new one
    }

    const chunks = chunkData(data, 25);
    const statusCounts = chunks.map(chunk => countDealStatus(chunk));

    // Prepare data for the chart
    const convertedCounts = statusCounts.map(count => count.converted);
    const labels = Array.from({ length: chunks.length }, (_, i) => `Leads ${i + 1}`);

    const ctx = canvasRef.current.getContext("2d");

    // Create the bar chart
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Converted to Deal",
            data: convertedCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts or updates
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // This effect will run whenever the 'data' changes

  return (
    <div className="w-full max-w-2xl mx-auto">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
