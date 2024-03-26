import React, { useEffect, useState } from 'react';
import useStore from '../store/ReadBooksStore';
import { useCookies } from 'react-cookie';
import { PieChart } from '@mui/x-charts/PieChart';
import { Chart } from "react-google-charts";

function Statistics() {
  const [cookies] = useCookies(['user']);
  const { readBooks, fetchReadBooks, setReadBooks, pagesRead, fetchPagesRead, setPagesRead } = useStore();
  // Variables to get dates
  const currentYear = new Date().getFullYear()
  const firstDayOfTheYear = new Date(2023, 0, 1)
  const lastDayOfTheYear = new Date(2023, 11, 31)
  // useState for genres and respective colors
  const [genreCounts, setGenreCounts] = useState({});
  const [genreColors, setGenreColors] = useState({});
  const [mostReadGenresThisYear, setMostReadGenresThisYear] = useState([]);
  // Authors
  const [authors, setAuthors] = useState([])
  const [mostReadAuthorsThisYear, setMostReadAuthorsThisYear] = useState([]);
  // E-book?
  const [bookTypeCounts, setBookTypeCounts] = useState({});
  const [bookTypeCountsThisYear, setBookTypeCountsThisYear] = useState({});
  // When book were started/finished
  const [readPerMonth, setReadPerMonth] = useState({});
  const [finsihedPerMonth, setFinishedPerMonth] = useState({});
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // How long it took a user to finish a book
  const [bookReadingDuration, setBookReadDuration] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchReadBooks();
        if (res != null) {
          console.log("Success");
        } else {
          console.log("Fail: No books fetched or empty array received");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        console.log("Fail: Error fetching books");
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPagesRead();
      } catch (error) {
        console.error("Error fetching pages:", error);
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
      // Variables to store which month books where started/finished
      const lastFiveBooks = readBooks
        .sort((a, b) => new Date(b.finished_date) - new Date(a.finished_date))
        .slice(0, 5);
      // Variable to store how many books read were e-books or regular books
      const bookCounts = {
        'E-book': 0,
        'Regular book': 0
      };
      // Variable to store which month books were started
      const startedReadingMonth = {};
      const finishedReadingMonth = {};
      // Book duartion
      const readingDuration = {};

      readBooks.forEach(book => {
        const author = book.book_version.book.authors.map(author => author.author.name);
        const genre = book.book_version.book.main_category.name;
        const startDate = new Date(book.start_date);
        counts[genre] = (counts[genre] || 0) + 1;
        colors[genre] = book.book_version.book.main_category.color_code;
        authorCounts[author] = (authorCounts[author] || 0) + 1;
        if (startDate >= firstDayOfTheYear && startDate <= lastDayOfTheYear) {
          counts[genre] = (counts[genre] || 0) + 1;
          colors[genre] = book.book_version.book.main_category.color_code;
        }
        // Filtering authors
        if (startDate >= firstDayOfTheYear && startDate <= lastDayOfTheYear) {
          const authors = book.book_version.book.authors.map(author => author.author.name);
          authors.forEach(author => {
            authorCounts[author] = (authorCounts[author] || 0) + 1;
          });
        }
        // Checks book type
        const isEbook = book.book_version.is_ebook;
        if (isEbook) {
          bookCounts['E-book']++;
        } else {
          bookCounts['Regular book']++;
        }
        if (startDate.getFullYear() === currentYear) {
          if (isEbook) {
            bookCounts['E-book']++;
          } else {
            bookCounts['Regular book']++;
          }
        }
        // Books started/ended each month
        const monthIndexStart = startDate.getMonth() + 1;
        startedReadingMonth[monthIndexStart] = (startedReadingMonth[monthIndexStart] || 0) + 1;
        const monthIndexFinished = startDate.getMonth() + 1;
        finishedReadingMonth[monthIndexFinished] = (finishedReadingMonth[monthIndexFinished] || 0) + 1;

      });

      lastFiveBooks.forEach(book => {
        // when books were started/finished beuíng read
        const startReadingDate = new Date(book.start_date);
        const finishReadingDate = new Date(book.finished_date);
        const readingDurationMs = finishReadingDate - startReadingDate;
        const readingDurationDays = Math.ceil(readingDurationMs / (1000 * 60 * 60 * 24));
        readingDuration[book.book_version.book.title] = readingDurationDays;
      });

      setGenreCounts(counts);
      setGenreColors(colors);
      const sortedGenres = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      setMostReadGenresThisYear(sortedGenres);
      // Authors
      const sortedAuthors = Object.entries(authorCounts).sort(([, countA], [, countB]) => countB - countA);
      setAuthors(sortedAuthors.slice(0, 5))
      setMostReadAuthorsThisYear(sortedAuthors.slice(0, 5));
      // Book type
      setBookTypeCounts(bookCounts);
      setBookTypeCountsThisYear(bookCounts)
      // Books started/ended
      setReadPerMonth(startedReadingMonth);
      setFinishedPerMonth(finishedReadingMonth)
      // Book duration
      setBookReadDuration(readingDuration);
    }
  }, [readBooks]);

  // Genres chart data
  const pieChartGenreData = Object.entries(genreCounts).map(([label, value]) => ({
    id: label,
    value,
    label,
  }));
  const pieChartGenreDataThisYear = mostReadGenresThisYear.map(([label, value]) => ({
    id: label,
    value,
    label,
    color: genreColors[label],
  }));

  // Authors chart data
  const pieChartAuthorsData = authors.map(([author, count]) => {
    return {
      id: author,
      label: author,
      value: parseInt(count),
    };
  });
  const pieChartAuthorsDataThisYear = mostReadAuthorsThisYear.map(([author, count]) => {
    return {
      id: author,
      label: author,
      value: parseInt(count),
    };
  });

  // Book type chart data
  const pieChartBookTypeData = Object.entries(bookTypeCounts).map(([type, count]) => ({
    id: type,
    label: type,
    value: count,
  }));
  const pieChartBookTypeDataThisYear = Object.entries(bookTypeCountsThisYear).map(([type, count]) => ({
    id: type,
    label: type,
    value: count,
  }));

  // Books started/ended
  const columnChartStartData = [
    ['Month', 'Books started'],
    ...Object.entries(readPerMonth).map(([monthIndexStart, count]) => {
      return [months[monthIndexStart - 1], count];
    }),
  ];
  const startDateOptions = {
    legend: { position: "none" },
    vAxis: { title: 'Books started' },
    hAxis: { title: 'Month' }
  };
  const columnChartFinishedData = [
    ['Month', 'Books finsihed'],
    ...Object.entries(finsihedPerMonth).map(([monthIndexFinished, count]) => {
      return [months[monthIndexFinished - 1], count];
    }),
  ];
  const finsihedDateOptions = {
    legend: { position: "none" },
    vAxis: { title: 'Books finished' },
    hAxis: { title: 'Month' }
  };

  // Book duartion
  const barChartData = Object.entries(bookReadingDuration).map(([bookTitle, durationDays]) => [bookTitle, durationDays]);
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
      <h3 className="text-xl mb-10 text-center">{`Most read genres - ${currentYear}`}</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartGenreDataThisYear }]}
          width={800}
          height={400}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">Most read authors</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartAuthorsData }]}
          width={800}
          height={400}
        />
      </div>
      <h3 className="text-xl mb-10 text-center">{`Most read authors - ${currentYear}`}</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartAuthorsDataThisYear }]}
          width={800}
          height={400}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">Books vs e-books</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartBookTypeData }]}
          width={800}
          height={400}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">{`Books vs e-books ${currentYear}`}</h3>
      <div className="flex justify-start mb-20">
        <PieChart
          series={[{ data: pieChartBookTypeDataThisYear }]}
          width={800}
          height={400}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">{`Books started each month - ${currentYear}`}</h3>
      <div>
        <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={columnChartStartData}
          options={startDateOptions}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">{`Books finished each month - ${currentYear}`}</h3>
      <div>
        <Chart
          chartType="ColumnChart"
          width={'100%'}
          height={'400px'}
          data={columnChartFinishedData}
          options={finsihedDateOptions}
        />
      </div>

      <h3 className="text-xl mb-10 text-center">{`Books duration - ${currentYear}`}</h3>
      <div>
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
