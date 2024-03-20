import React, { useState } from "react";
import FindBooksStore from "../store/FindBooksStore";
import ReadingBooksStore from "../store/ReadingBooksStore";

function SearchBar() {
  const {fetchBooks} = FindBooksStore();
  const {fetchReadingBooks} = ReadingBooksStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormError('')
      setSubmitting(true)
      fetchBooks(searchTerm)
    } catch (err) {
      console.error(err)
      setFormError(err.toString())
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onFormSubmit} className="flex">
        <input
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm border mx-auto border-gray-300 bg-white rounded-full px-2 py-0.5"
          type="search"
          />
          {Boolean(formError) &&
        <div className="form-error">{formError}</div>
        }
          <button type="submit" disabled={submitting}>
            search
          </button>
    </form>
  );
}

export default SearchBar;
