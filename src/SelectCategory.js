import React from "react";

const SelectCategory = (props) => {

  const {book, shelfUpdate} = props;

  return (
    <div className="book-shelf-changer">
      <select onChange={e => {shelfUpdate(e.target.value, book)}} value={book.shelf || 'none'} >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default SelectCategory;
