import React, { Component } from "react";
import SearchForm from "../SearchBar/SearchBar";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import API from "../../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: []
  };

  // When this component mounts, we send a request to the API to pull in 200 "employees" -- this means that when the page is refreshed, we will get 200 "new" employees (the api generates them at random)
  componentDidMount = () => {
    this.getEmployees();
  };
  // api request sets our results array equal to the response
  getEmployees = () => {
    API.getUsers()
      .then((res) => {
        this.setState({
          results: res.data.results,
          filtered: res.data.results,
        });
        console.log(this.state.results[0]);
      })
      .catch((err) => console.log(err));
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
        <EmployeeTable results={this.state.results.filter(
      (emp) =>
        emp.cell.includes(this.state.search) ||
        emp.email.includes(this.state.search) ||
        emp.name.first.includes(this.state.search) ||
        emp.name.last.includes(this.state.search) ||
        emp.phone.includes(this.state.search)
    )} />
      </div>
    );
  }
}

export default SearchResultContainer;
