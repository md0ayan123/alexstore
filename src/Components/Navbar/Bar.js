import React, { useState } from 'react';
import searchIcon from '../../assets/searchicon.png';
import './Bar.css'

const Bar = (onSearch) => {
     const [query, setQuery] = useState('');
     
    const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    <div>
      <div className="search-box d-flex align-items-center py-1" style={{
                  border: "1px solid #ccc",
                  borderRadius: "2px",
                  backgroundColor: "#fff"
                }}>
                  <img src={searchIcon} alt="" style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "8px",
                    marginRight: "4px"
                  }} />
                  <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="search-input border-0 p-2"
                    style={{
                      outline: "none",
                      flex: "1",
                      backgroundColor: "#fff",
                      width: "300px",
                      borderRadius: "2px",
                      height: "15px"
                    }}
                  />
                </div>
    </div>
  )
}

export default Bar
