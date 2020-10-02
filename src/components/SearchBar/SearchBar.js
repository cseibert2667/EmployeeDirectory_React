import React from "react";
import "./SearchBar.css"

function SearchBar(props) {
  return (
    <form>
      <div className="form-group">
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Filter by Name, Phone #, or Email"
          id="search"
        />
      </div>
    </form>
  );
}

export default SearchBar;
