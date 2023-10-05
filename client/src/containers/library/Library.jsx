import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './library.css';

function Library() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
      // Replace 'apiUrl' with the actual URL of your API
      axios.get('/api/v1/books/')
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    

    return (
        <div className='library'>
            test
        </div>
    )
}

export default Library;
