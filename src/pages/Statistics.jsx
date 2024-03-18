import React, { useEffect, useState } from 'react';
import useStore from '../store/ReadBooksStore';
import { useCookies } from 'react-cookie';
import { PieChart } from '@mui/x-charts/PieChart';
import { Chart } from "react-google-charts";

function Statistics() {
  const [cookies] = useCookies(['user']);
  const { readBooks, fetchReadBooks, setReadBooks } = useStore();
  // Variables to get dates
  const currentYear = new Date().getFullYear()
  const firstDayOfTheYear = new Date(2023, 0, 1)
  const lastDayOfTheYear = new Date(2023, 11, 31)
  // useState for genres and respective colors
  const [genreCounts, setGenreCounts] = useState({});
  const [genreColors, setGenreColors] = useState({});
  const [mostReadGenresThisYear, setMostReadGenresThisYear] = useState([]);
  // Authors
  const [authors, setAuthors] = useState({})


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
      // Variables for genres and colors
      const authorCounts = {};
      const counts = {};
      const colors = {};

      readBooks.forEach(book => {
        const author = book.book.author;
        console.log(book.book.author)
        const genre = book.book.main_category.name;
        const startDate = new Date(book.start_date);
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book.main_category.color_code;
        authorCounts[author] = (authorCounts[author] || 0) + 1;
        if (startDate >= firstDayOfTheYear && startDate <= lastDayOfTheYear) {
          counts[genre] = (counts[genre] || 0) + 1;
          colors[genre] = book.book.main_category.color_code;
        }

      });
      setGenreCounts(counts);
      setGenreColors(colors);
      const sortedGenres = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      setMostReadGenresThisYear(sortedGenres); 
      // Authors
      setAuthors(author)

    }
  }, [readBooks]);

  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  const pieChartGenreDataThisYear = mostReadGenresThisYear.map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));


  return (
    <div className="md:w-2/3 w-11/12 mx-auto">
      <h2 className="text-4xl mb-20 text-center">Statistics</h2>
      <h3 className="text-xl mb-10 text-center">Most read genres</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartGenreData }]}
          width={800}
          height={400}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">{`Most read genres - ${(new Date().getFullYear())}`}</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartGenreDataThisYear }]}
          width={800}
          height={400}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">Most read authors</h3>
      <h3 className="text-xl mb-10 text-center">{`Most read authors - ${(new Date().getFullYear())}`}</h3>

      <h3 className="text-xl mb-10 text-center">{`Books started each month - ${(new Date().getFullYear())}`}</h3>

      <h3 className="text-xl mb-10 text-center">{`Books finished each month - ${(new Date().getFullYear())}`}</h3>

      <h3 className="text-xl mb-10 text-center">{`Pages read each month - ${(new Date().getFullYear())}`}</h3>

      <h3 className="text-xl mb-10 text-center">{`Books uration - ${(new Date().getFullYear())}`}</h3>

    </div>
  );
}

export default Statistics;
