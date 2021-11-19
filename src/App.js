import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Search from "./Search";

const BooksApp = (props) => {
  const [Books, setBooks] = useState([]);
  const [UpdateState, setUpdate] = useState(true);

  useEffect(() => {
    // get all books from API & set state
    BooksAPI.getAll().then((Books) => {
      console.log(Books);
      setBooks(Books);
    });
  }, []);

  /* to change the category recives
  the book that will change and 
  the shelf which it will move to */
  const changeCategory = (shelf, book) => {
    // find the index of the updated book in the books array
    const bookIndex = Books.findIndex((x) => x.id === book.id);
    // make a new books list with the updates
    const newBooks = Books;

    //check if the book in books or not
    if (bookIndex === -1) {
      // update its shelf and add it to newBooks
      book.shelf = shelf;
      newBooks.push(book);
    } else {
      // if it exist just update its shelf
      newBooks[bookIndex].shelf = shelf;
    }

    // Update API
    BooksAPI.update(book, shelf);
    // Update state
    setBooks(newBooks);
    // to update UI
    setUpdate(!UpdateState);
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Shelf
                    shelfTitle="Currently Reading"
                    books={Books.filter(
                      (book) => book.shelf === "currentlyReading"
                    )}
                    shelfUpdate={changeCategory}
                  />
                  <Shelf
                    shelfTitle="Want to Read"
                    books={Books.filter((book) => book.shelf === "wantToRead")}
                    shelfUpdate={changeCategory}
                  />
                  <Shelf
                    shelfTitle="Read"
                    books={Books.filter((book) => book.shelf === "read")}
                    shelfUpdate={changeCategory}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            }
          />
          <Route
            path="/search"
            element={<Search books={Books} shelfUpdate={changeCategory} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default BooksApp;
