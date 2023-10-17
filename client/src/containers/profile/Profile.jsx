import React, { useState, useEffect } from 'react';
import ProfileService from '../../services/profile.service';
import { Link } from 'react-router-dom';
import "./profile.css"

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    // Fetch profile details
    ProfileService.me()
      .then((response) => {
        setProfile(response);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });

    ProfileService.searched_books()
      .then((response) => {
        setSearchedBooks(response.books_i_searched);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error fetching searched_books:", error);
      });

  }, []);

  return (
    <div className="profile-container">
      <div className="profile-details">
        {profile && (
          <div>
            <h3>First Name: {profile.first_name}</h3>
            <h3>Last Name: {profile.last_name}</h3>
            <p>Email: {profile.email}</p>
            {/* Display other profile details as needed */}
          </div>
        )}
      </div>
      <h1>Searched Books</h1>
      <div className="searched-books">
        <div className="searched-books">
            {searchedBooks.map((book, index) => (
                <div key={index} className='book'>
                    <Link to={`/book/${book.isbn}`}>
                        <img className="book__cover_image" src={book.cover_image} alt={`Cover for ${book.title}`} />
                        <h2 className='book__title'>{book.title}</h2>
                        <p className='book__author'>Author: {book.author_full_name}</p>
                    </Link>
                </div>
            ))}
        </div>
      </div>
      <Link to="/" className="return-button">Return to Library</Link>
    </div>
  );
};

export default Profile;
