import React, { useEffect, useState } from 'react';
import useStore from '../store/ReadBooksStore';
import { useCookies } from 'react-cookie';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function Statistics() {
  const [cookies] = useCookies(['user']);
  const { readBooks, fetchReadBooks } = useStore();
  const [genreCounts, setGenreCounts] = useState({});
  const [genreColors, setGenreColors] = useState({});
  const [startDate, setStartDate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchReadBooks()
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, [fetchReadBooks]);

  useEffect(() => {
    if (readBooks) {
      const counts = {};
      const colors = {};
      const booksStartDate = {}; 
      readBooks.forEach(book => {
        const genre = book.book.main_category.name;
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book.main_category.color_code;
        const startMonth = new Date(book.book.start_date).getMonth(); // Extract month from start date
        booksStartDate[startMonth] = (booksStartDate[startMonth] || 0) + 1; // Increment count for the month
      });
      setGenreCounts(counts);
      setGenreColors(colors);
      setStartDate(booksStartDate); // Set the updated start date data
    }
  }, [readBooks]);

  // Pie chart data remains the same
  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Bar chart data for books started each month
  const barChartData = months.map((month, index) => ({
    x: month,
    y: startDate[index] || 0, // Use count for the month, or default to 0 if no books started
  }));

  return (
    <div className="md:w-2/3 w-11/12 mx-auto">
      <h2 className="text-4xl mb-20 text-center">Statistics</h2>
      <h3 className="text-xl mb-10 text-center">Most read genres this year</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartGenreData }]}
          width={800}
          height={400}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Books started each month</h3>
      <div className="flex justify-start mb-20">
        <BarChart
          xAxis={[{ scaleType: 'band', data: months }]}
          series={[{ data: barChartData }]} // Use barChartData for the series data
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}

export default Statistics;
