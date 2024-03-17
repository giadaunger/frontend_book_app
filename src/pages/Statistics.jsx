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
  const [finishedPerMonth, setFinishedPerMonth] = useState({});
  const [pagesReadPerMonth, setPagesReadPerMonth] = useState({});
  const [bookReadingDuration, setBookReadDuration] = useState({});
  const [authors, setAuthors] = useState({})
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
      const lastFiveBooks = readBooks
        .sort((a, b) => new Date(b.finished_date) - new Date(a.finished_date))
        .slice(0, 5);
      const authorCounts = {};
      const counts = {};
      const colors = {};
      const startedReadingMonth = {};
      const finishedReadingMonth = {};
      const readingDuration = {};
      const pagesRead = {};
      readBooks.forEach(book => {
        const author = book.book.author;
        console.log(book.book.authors.author);
        const genre = book.book.main_category.name;
        const startMonth = new Date(book.start_date).getMonth() + 1;
        const endMonth = new Date(book.finished_date).getMonth() + 1;
        const key = `${startMonth}-${new Date(book.start_date).getFullYear()}`;
        finishedReadingMonth[endMonth] = (finishedReadingMonth[endMonth] || 0) + 1;
        startedReadingMonth[startMonth] = (startedReadingMonth[startMonth] || 0) + 1;
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book.main_category.color_code;
        pagesRead[key] = (pagesRead[key] || 0) + book.pages_read;
        authorCounts[author] = (authorCounts[author] || 0) + 1;
      });
      lastFiveBooks.forEach(book => {
        const startReadingDate = new Date(book.start_date);
        const finishReadingDate = new Date(book.finished_date);
        const readingDurationMs = finishReadingDate - startReadingDate;
        const readingDurationDays = Math.ceil(readingDurationMs / (1000 * 60 * 60 * 24));
        readingDuration[book.book.title] = readingDurationDays;
      });
      const sortedAuthors = Object.entries(authorCounts).sort(([, countA], [, countB]) => countB - countA);
      const topAuthors = sortedAuthors.slice(0, 5);
      setGenreCounts(counts);
      setGenreColors(colors);
      setReadPerMonth(startedReadingMonth);
      setFinishedPerMonth(finishedReadingMonth);
      setPagesReadPerMonth(pagesRead);
      setBookReadDuration(readingDuration);
      setAuthors(topAuthors);
    }
  }, [readBooks]);


  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  const pieChartAuthorData = Object.entries(authors).map(([label, value]) => ({
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

  const columnChartEndDate = months.map((month, index) => {
    const monthValue = finishedPerMonth[index + 1] || 0;
    const genreColor = Object.values(genreColors)[index % Object.values(genreColors).length];
    return [month, monthValue, genreColor];
  });

  const chartData = Object.entries(pagesReadPerMonth).map(([date, pages]) => {
    const [month, year] = date.split('-');
    return [new Date(parseInt(year, 10), parseInt(month, 10) - 1), pages];
  });

  const startDateOptions = {
    legend: { position: "none" },
    bars: 'vertical',
    vAxis: { title: 'Books started' },
    hAxis: { title: 'Month' }
  };

  const finishedDateOptions = {
    legend: { position: "none" },
    bars: 'vertical',
    vAxis: { title: 'Books finished' },
    hAxis: { title: 'Month' }
  };

  const pagesReadOptions = {
    title: 'Pages Read Each Month',
    hAxis: {
      title: 'Month',
      format: 'MMM yyyy'
    },
    vAxis: { title: 'Pages Read' },
    legend: 'none'
  };

  const barChartData = Object.entries(bookReadingDuration).map(([bookTitle, durationDays]) => [bookTitle, durationDays]);

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
        {/* <PieChart
          series={[{ data: topAuthors }]}
          width={800}
          height={400}
        /> */}
      </div>
      <h3 className="text-xl mb-10 text-center">Books started each month</h3>
      <div className="flex justify-start mb-20">
        <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={[['Month', 'Books started', { role: 'style' }], ...columnChartStartDate]}
          options={startDateOptions}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Books finished each month</h3>
      <div className="flex justify-start mb-20">
        <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={[['Month', 'Books started', { role: 'style' }], ...columnChartEndDate]}
          options={finishedDateOptions}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Pages Read Each Month</h3>
      <div className="flex justify-start mb-20">
        <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={[['Month', 'Pages Read'], ...chartData]}
          options={pagesReadOptions}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Book Reading Duration</h3>
      <div className="flex justify-start mb-20">
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={[['Book', 'Duration (Days)'], ...barChartData]}
        />
      </div>
    </div>
  );
}

export default Statistics;
