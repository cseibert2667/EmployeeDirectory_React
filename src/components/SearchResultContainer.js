import React, { Component } from "react";
import SearchForm from "./SearchBar";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: [],
    filtered: []
  };

  // When this component mounts, we send a request to the API to pull in 200 "employees" -- this means that when the page is refreshed, we will get 200 "new" employees (the api generates them at random)
  componentDidMount = () => {
    this.getEmployees();
  };
  // api request sets our results array equal to the response
  getEmployees = () => {
    API.getUsers()
      .then((res) => {
        this.setState({ results: res.data.results, filtered: res.data.results });
        console.log(this.state.results[0]);
      })
      .catch((err) => console.log(err));
  };
  // searches the existing 200 employees that we pulled in above
  searchEmployees = (query) => {
    const filteredEmployees = this.state.results.filter(
      (emp) =>
        emp.cell.includes(query) ||
        emp.dob.date.includes(query) ||
        emp.email.includes(query) ||
        emp.name.first.includes(query) ||
        emp.name.last.includes(query) ||
        emp.phone.includes(query)
    );
    // sets this.state.results to the newly filtered array
    this.setState({ filtered: filteredEmployees });
    console.log(this.state.filtered) // --- Why does this only update on the second click?
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, search employees for `this.state.search`
  // How to reset state to original 200 results?
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <EmployeeCard results={this.state.filtered} />
      </div>
    );
  }
}

export default SearchResultContainer;
