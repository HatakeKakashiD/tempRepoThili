// Statistics.js

import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';

const Statistics = () => {
  const [categoryTypeCounts, setCategoryTypeCounts] = useState([]);
  const [prioritizationCounts, setPrioritizationCounts] = useState([]);

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryTypeCountsResponse = await axios.get('http://localhost:8070/inquiry/statistics/categoryTypeCounts');
        setCategoryTypeCounts(categoryTypeCountsResponse.data);

        const prioritizationCountsResponse = await axios.get('http://localhost:8070/inquiry/statistics/prioritizationCounts');
        setPrioritizationCounts(prioritizationCountsResponse.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    renderPieChart();
    renderBarChart();

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [categoryTypeCounts, prioritizationCounts]);

  const renderPieChart = () => {
    const ctx = pieChartRef.current.getContext('2d');
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }
    pieChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categoryTypeCounts.map(item => item.category),
        datasets: [{
          label: 'Category Type Counts',
          data: categoryTypeCounts.map(item => item.count),
          backgroundColor: [
            'red', 'blue', 'green', 'orange' // Add more colors as needed
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  };

  const renderBarChart = () => {
    const ctx = barChartRef.current.getContext('2d');
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }
    barChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: prioritizationCounts.map(item => item.prioritization),
        datasets: [{
          label: 'Prioritization Counts',
          data: prioritizationCounts.map(item => item.count),
          backgroundColor: ['red', 'blue', 'green'] // Add more colors as needed
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h3>Category Type Counts:</h3>
        <canvas id="pieChartCanvas" ref={pieChartRef}></canvas>
      </div>
      <div>
        <h3>Prioritization Counts:</h3>
        <canvas id="barChartCanvas" ref={barChartRef}></canvas>
      </div>
    </div>
  );
};

export default Statistics;
