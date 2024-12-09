import React, { useState, useEffect } from 'react';
import './CardpackResults.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CardpackResults = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const mintedCards = location.state?.mintedCards;
    console.log("frontend mintedCards: ", mintedCards)

    useEffect(() => {
        console.log('minted cards list: ', mintedCards);
    }, [mintedCards]);

    const handleOpenAnotherPack = () => {
        navigate('/cardpack');
    }

    const handleViewCollection = () => {
        navigate('/collection');
    }

    const handleHome = () => {
        navigate('/');
    };
    
    return (
        <>
        <h4 className='login-title'>{props.account !=null ? (<>Connected to: {props.account}</>):(<><p></p></>)}</h4>
        <div className="cardpack-results-container">
            <div className="cardpack-results-content">
            {mintedCards && mintedCards.length > 0 ? (
                    mintedCards.map((listing, index) => (
                    <div className="result-card" key={index}>
                        <img src={listing.metadataURI} className="result-card-image" alt={listing.title} />
                        <p className="card-title">Card Title {listing.tokenId}</p>
                    </div>
                    ))
                ) : (
                    <p>No cards minted yet. Please try minting!</p>
                )
                }
            </div>
            <div className='button-container'>
                <button 
                    className="open-another-cardpack-btn"
                    onClick={handleOpenAnotherPack}
                >
                    Open Another Pack 
                </button>
                <button 
                    className="view-collection-btn"
                    onClick={handleViewCollection}
                >
                    View Collection
                </button>
                <button 
                    className="home-btn"
                    onClick={handleHome}
                >
                    Back to Homepage
                </button>
            </div>
            
        </div>
        </>
    );
};

export default CardpackResults;