import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RatingService from '../../services/rating.service';
import BookService from '../../services/book.service';
import { Login } from '../../components';

import './bookDetails.css';


import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



const BookDetails = () => {
    const { id } = useParams(); // Get the ID from the route parameters
    const [bookDetails, setBookDetails] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState(false);
    const [rating, setRating] = useState(null)
    const [ratingDetails, setRatingDetails] = useState(null)
    const [needToLogIn, setNeedToLogIn] = useState(false)

    useEffect(() => {
        // First, fetch book details
        BookService.details(id)
          .then((data) => {
            console.log(data);
            setBookDetails(data);
      
            // Once you have the book details, fetch recommended books
            return BookService.recommend(data.title);
          })
          .then((data) => {
            setRecommendedBooks(data.books);
          })
          .catch((error) => {
            console.error("An error occurred: ", error);
          });
      }, [id]);
      
    const check_rating = () => {
        RatingService.check_rating(id).then(data => {
            if (data.rating) {
                setRating(data.rating)
                setRatingDetails(data)
            } else {
                setRating(null)
                setRatingDetails(null)
                console.log("Rating not found")
            }
        })
        console.log(rating)
    }


    useEffect(() => {
        check_rating();
    }, [id])


    const handleNeedToLogin = () => {
        if (!needToLogIn) {
            setNeedToLogIn(true)
        } else {
            setNeedToLogIn(false)
        }
    }

    const handleRateBook = (newRating) => {
        if (newRating==null && ratingDetails) {
            handleRatingDelete()
        } else {
            RatingService.rate_book(id, newRating).then(data => {
                if (data.rating) {
                    check_rating()
                } else if (data.response.status == 401) {
                    handleNeedToLogin()
                } else {
                    console.log("Rate Book error" + data.response)
                }
            })   
        }
        }
        


    const handleRatingDelete = () => {
        if (ratingDetails) {
            RatingService.remove_rating(ratingDetails.id).then(()=> {
                check_rating()
            })
        }
        else console.log("No rating found to delete")
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
                    {needToLogIn && <Login onClose={handleNeedToLogin}/>}
                    <Rating name="customized-10" value={rating} max={10} onChange={(_,newRating)=>{
                        handleRateBook(newRating);
                    }} />
                    {ratingDetails && 
                    (<p className="login-btn" onClick={handleRatingDelete}>Delete Rating</p>)}
                    
                </div>
            </div>
            <div className="recommended-books">
                <h2 className="medium-margin-top">Recommended Books</h2>
                {recommendedBooks ? (
                recommendedBooks.length > 0 ? (
                    <div className="recommended-books-list">
                    {recommendedBooks.map((recommendedBook, index) => (
                        <Link key={index} to={`/books/${recommendedBook.id}`} className="recommended-book">
                        <img
                            className="recommended-book__cover_image"
                            src={recommendedBook.cover_image}
                            alt={`Cover for ${recommendedBook.title}`}
                        />
                        <p>{recommendedBook.title}</p>
                        </Link>
                    ))}
                    </div>
                ) : (
                    <div>No recommended books available</div>
                )
                ) : (
                <div>Loading...</div>
                )}

            </div>
            <Link to="/" className="return-button">Return to Library</Link>
        </div>
    );
}

export default BookDetails;