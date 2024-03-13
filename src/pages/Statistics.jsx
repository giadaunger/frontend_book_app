import React, { useEffect, useState } from 'react';
import useStore from '../store/ReadingBooksStore';
import { useCookies } from 'react-cookie';
import { PieChart } from '@mui/x-charts/PieChart';

function Statistics() {
  const [cookies] = useCookies(['user']);
  const { setReadingBooks, readingBooks, fetchReadingBooks } = useStore();
  const [genreCounts, setGenreCounts] = useState({});
  const [genreColors, setGenreColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchReadingBooks();
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchData();
  }, [fetchReadingBooks]);

  useEffect(() => {
    if (readingBooks) {
      const counts = {};
      const colors = {};
      readingBooks.forEach(book => {
        const genre = book.book.main_category.name;
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book.main_category.color_code; // Assuming color_code is the property that holds the color
      });
      setGenreCounts(counts);
      setGenreColors(colors);
    }
  }, [readingBooks]);

  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  return (
    <div className="md:w-2/3 w-11/12 mx-auto">
      <h2 className="text-4xl mb-10 text-center">Statistics</h2>
      <h3 className="text-xl mb-5">Most read genres this year</h3>
      <div className="">
        <PieChart
          series={[{ data: pieChartGenreData }]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}

export default Statistics;
