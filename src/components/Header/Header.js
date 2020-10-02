import React from 'react';
import "./Header.css";

export default function Header() {
    return (
        <div className="banner">
            <div className="header">
                <h1>Employee Directory</h1>
            </div>
            <div className="info">
                <h5>To filter, simply begin typing, or click on the "Name" heading to sort alphabetically in ascending or descending order.</h5>
            </div>
        </div>
    )
}
