import React, { useState } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearch] = useState([]);

  const updateQuery = (q) => {
    setQuery(q);

    BooksAPI.search(q).then((results) => {
      if (results && results.length > 0) {
        // loop over the result array
        for (let result of results) {
          // loop over the books array
          for (let book of props.books) {
            // if you found the matched book in the books array
            if (result.id === book.id) {
              // find its index in the books array
              const index = props.books.findIndex((b) => b.id === result.id);
              // make sure that there shelves match
              result.shelf = props.books[index].shelf;
            }
          }
        }
      }
      // set the searchedBooks to the results array
      setSearch(results);
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => {
              updateQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks &&
            searchedBooks.length > 0 &&
            searchedBooks.map((book) => (
              <Book key={book.id} book={book} shelfUpdate={props.shelfUpdate} />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
