import React, { useState, useEffect } from 'react';
import './newest.scss';
import likeOff from '../../icons/like_off.svg';
import likeOn from '../../icons/like_on.svg';

function Newest() {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState([]);

  const handleLike = (index) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json'
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  (function(){
    const cutText = (elements, maxLength) => {
      for(let i = 0; i < elements.length; i++){
        elements[i].innerText = elements[i].innerText.slice(0, maxLength) + '...';
      }
    };
    cutText(document.getElementsByClassName('text'), 142);
    cutText(document.getElementsByClassName('title'), 40);
  })();

  return (
    <div className="newest">
      <h1>Новости</h1>
      <div className="content">
        {data.map((item, index) => (
          <div key={item.id} className="card">
            <img src={item.imgUrl} alt={item.name} className="img" />
            <div className="card_content">
              <div className="td_block">
                <h2 className="title">{item.name}</h2>
                <p className="date">{item.date}</p>
              </div>
              <p className="text">{item.text}</p>
              <div className="author_like_block">
                <p className="author">{item.author}</p>
                <div className="like-button" onClick={() => handleLike(index)}>
                  {liked[index] ? (
                    <img src={likeOff} alt="Filled Like" />
                  ) : (
                    <img src={likeOn} alt="Empty Like" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Newest;