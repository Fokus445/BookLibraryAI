import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RatingService from '../../services/rating.service';

import './bookDetails.css';


import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



const BookDetails = () => {
    const { id } = useParams(); // Get the ID from the route parameters
    const [bookDetails, setBookDetails] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [rating, setRating] = useState(0)
    const [needToLogIn, setNeedToLogIn] = useState(false)

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

    useEffect(() => {
        RatingService.check_rating(id).then(rating => {
            console.log(rating)
            if (rating) {
                setRating(rating)
            } else {
                console.log("Rating not found")
            }
        })
    }, [id])

    const handleRateBook = (rating) => {
        RatingService.rate_book(id, rating).then(response => {
                if (response.status === 201) {
                    setRating(rating)
                } else {
                    setNeedToLogIn(true)
                }
            })   
    }

    

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
                    <h3>Average Rating: {bookDetails.average_rating}</h3>

                    
                    <Typography component="legend">Rating</Typography>
                    <Rating name="customized-10" defaultValue={rating} max={10} onChange={(_,newRating)=>{
                        handleRateBook(newRating);
                    }} />
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