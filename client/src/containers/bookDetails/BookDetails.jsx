import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import './bookDetails.css';

const BookDetails = () => {
    const { id } = useParams(); // Get the ID from the route parameters
    const [bookDetails, setBookDetails] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Fetch book details based on uuid
                const bookDetailsResponse = await axios.get(`/api/v1/books/${id}`);
                const bookDetailsData = bookDetailsResponse.data;
                setBookDetails(bookDetailsData);

                // Fetch recommended books based on the current book
                const recommendedBooksResponse = await axios.post('/api/v1/recommend/', { title: bookDetailsData.title });
                const recommendedBooksData = recommendedBooksResponse.data;
                setRecommendedBooks(recommendedBooksData.books);
            } catch (error) {
                console.error('Error fetching book details or recommended books:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or message
    }

    return (
        <div className="book-details">
            <div className="book-info">
                <img className="bookDetails__cover_image" src={bookDetails.cover_image} alt={`Cover for ${bookDetails.title}`} />
                <div className="book-details-text">
                    <h1>{bookDetails.title}</h1>
                    <p>Author: {bookDetails.author_full_name}</p>
                    <p>ISBN: {bookDetails.isbn}</p>
                    <p>Publisher: {bookDetails.publisher_name}</p>
                    <p>Release Year: {bookDetails.release_year}</p>
                </div>
            </div>
            <div className="recommended-books">
                <h2 className="medium-margin-top">Recommended Books</h2>
                <div className="recommended-books-list">
                    {recommendedBooks.map((recommendedBook, index) => (
                        <Link key={index} to={`/books/${recommendedBook.id}`} className="recommended-book">
                            <img className="recommended-book__cover_image" src={recommendedBook.cover_image} alt={`Cover for ${recommendedBook.title}`} />
                            <p>{recommendedBook.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <Link to="/" className="return-button">Return to Library</Link>
        </div>
    );
}

export default BookDetails;