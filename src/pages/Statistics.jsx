import React, { useEffect, useState } from 'react';
import useStore from '../store/ReadBooksStore';
import { useCookies } from 'react-cookie';
import { PieChart } from '@mui/x-charts/PieChart';
import { Chart } from "react-google-charts";

function Statistics() {
  const [cookies] = useCookies(['user']);
  const { readBooks, fetchReadBooks, setReadBooks } = useStore();
  const [genreCounts, setGenreCounts] = useState({});
  const [genreColors, setGenreColors] = useState({});
  const [readPerMonth, setReadPerMonth] = useState({});
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await fetchReadBooks();
        setReadBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (readBooks) {
      const counts = {};
      const colors = {};
      const startedReadingMonth = {};
      readBooks.forEach(book => {
        const genre = book.book.main_category.name;
        const startMonth = new Date(book.start_date).getMonth() + 1;
        startedReadingMonth[startMonth] = (startedReadingMonth[startMonth] || 0) + 1;
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book.main_category.color_code;
      });
      setGenreCounts(counts);
      setGenreColors(colors);
      setReadPerMonth(startedReadingMonth);
    }
  }, [readBooks]);

  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  const columnChartStartDate = months.map((month, index) => {
    const monthValue = readPerMonth[index + 1] || 0; 
    const genreColor = Object.values(genreColors)[index % Object.values(genreColors).length]; 
    return [month, monthValue, genreColor];
  });

  const options = {
    legend: { position: "none" },
    bars: 'vertical',
    vAxis: { title: 'Books started' },
    hAxis: { title: 'Month' }
  };

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
      <h3 className="text-xl mb-10 text-center">Most read authors this year</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartGenreData }]}
          width={800}
          height={400}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Books started each month</h3>
      <div className="flex justify-start mb-20">
      <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={[['Month', 'Books started', { role: 'style' }], ...columnChartStartDate]}
          options={options}
        />
      </div>
    </div>
  );
}

export default Statistics;
