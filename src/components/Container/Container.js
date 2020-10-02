import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import EmployeeTable from "../EmployeeTable/EmployeeTable";
import Header from "../Header/Header";
import API from "../../utils/API";
import "./Container.css";

class Container extends Component {
  state = {
    alphabetical: true,
    search: "",
    results: [],
    alphResults: [],
    sortedIcon: ""
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

  // sorts alphabetically by first name, in ascending or descending order dependent on the current value of "alphabetical" in our state
  sortByName = () => {
    let sorted = [];
    if (this.state.alphabetical) {
      this.setState({ sortedIcon: "▲"})
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.first.toLowerCase();
        let nameB = b.name.first.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      this.setState({ sortedIcon: "▼"})
      sorted = this.state.results.sort((a, b) => {
        let nameA = a.name.first.toLowerCase();
        let nameB = b.name.first.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    this.setState({
      alphabetical: !this.state.alphabetical,
      alphResults: sorted,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchBar
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <table className="table table-striped table-dark text-center">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">
                <span id="name" onClick={this.sortByName}>Name {this.state.sortedIcon}</span>
              </th>
              <th scope="col">Contact</th>
              <th scope="col">DOB</th>
              <th scope="col">Hire Date</th>
            </tr>
          </thead>
          <EmployeeTable
            results={this.state.results.filter(
              (emp) =>
                emp.cell.includes(this.state.search) ||
                emp.email.includes(this.state.search) ||
                emp.name.first.includes(this.state.search) ||
                emp.name.last.includes(this.state.search) ||
                emp.phone.includes(this.state.search)
            )}
          />
        </table>
      </div>
    );
  }
}

export default Container;
