import React from "react";
import Book from "./Book";

const Shelf = (props) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books &&
              props.books.length > 0 &&
              props.books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  shelfUpdate={props.shelfUpdate}
                />
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Shelf;
