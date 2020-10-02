import React from "react";
import Moment from "react-moment";
import "./EmployeeTable.css";

function EmployeeTable(props) {
  // bootstrap table for each employee: image, name, cell, email

  return (
    <tbody>
      {props.results.map((emp) => (
        <tr>
          <td scope="row">
            <img src={emp.picture.medium} id="empImg" />
          </td>
          <td id="name">
            {emp.name.first} {emp.name.last}
          </td>
          <td>
            <b>Home:</b> {emp.phone} <br />
            <b>Cell:</b> {emp.cell} <br />
            <b>Email:</b> {emp.email} <br />
          </td>
          <td>
            <Moment format="MMMM DD, YYYY">{emp.dob.date}</Moment>
          </td>
          <td>
            <Moment format="MMMM DD, YYYY">{emp.registered.date}</Moment>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default EmployeeTable;
