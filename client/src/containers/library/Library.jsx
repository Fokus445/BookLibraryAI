import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './library.css';



const Library = () => {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
      // Replace 'apiUrl' with the actual URL of your API
      axios.get('/api/v1/books?page='+currentPage)
        .then((response) => response.data)
        .then((data) => {
            setBooks(data.results)
            console.log(books)
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.get(`/api/v1/books/?query=${searchQuery}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error searching for books:', error);
        }
      };

    
    

    return (
        <div className='library'>
            <form onSubmit={handleSearch}>
                <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map((book, index) => (
                <li key={index} className='book'>
                <Link to={`/book/${book.isbn}`}>
                    <img className="book__cover_image" src={book.cover_image} alt={`Cover for ${book.title}`} />
                    <h2 className='book__title'>{book.title}</h2>
                    <p className='book__author'>Author: {book.author_full_name}</p>
                </Link>
            </li>
                ))}
            </ul>
        {/* Pagination controls */}
        <button
            className="library-button" // Apply the button class
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
        >
            Previous
        </button>
        <span className="library-page">Page {currentPage}</span> {/* Apply the span class */}
        <button
            className="library-button" // Apply the button class
            disabled={books.length < 30} // Adjust this condition based on your API response
            onClick={() => handlePageChange(currentPage + 1)}
        >
            Next
        </button>
        <ul className="books">
            {books.map((book, index) => (
                <li key={index} className='book'>
                    <Link to={`/book/${book.isbn}`}>
                        <img className="book__cover_image" src={book.cover_image} alt={`Cover for ${book.title}`} />
                        <h2 className='book__title'>{book.title}</h2>
                        <p className='book__author'>Author: {book.author_full_name}</p>
                    </Link>
                </li>
            ))}
        </ul>
        <div>
      {/* Pagination controls */}
        <button
            className="library-button" // Apply the button class
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
        >
            Previous
        </button>
        <span className="library-page">Page {currentPage}</span> {/* Apply the span class */}
        <button
            className="library-button" // Apply the button class
            disabled={books.length < 30} // Adjust this condition based on your API response
            onClick={() => handlePageChange(currentPage + 1)}
        >
            Next
        </button>
        </div>
      </div>

    )
}

export default Library;
