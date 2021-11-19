import React from "react";
import SelectCategory from "./SelectCategory";

const Book = (props) => {
  const book = props.book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.smallThumbnail
                  ? `url(${book.imageLinks.smallThumbnail})`
                  : book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : "none",
            }}
          ></div>
          <SelectCategory book={book} shelfUpdate={props.shelfUpdate} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.length > 1
            ? book.authors.join(", ")
            : book.authors}
        </div>
      </div>
    </li>
  );
};

export default Book;
