import React from "react";

function EmployeeCard(props) {
  // bootstrap card for each employee: image, name, cell, email
  return (
    <>
    {props.results.map(emp => (
      <p>Name: {emp.name.first} {emp.name.last}</p>
    ))}
    </>
  );
}

export default EmployeeCard;
