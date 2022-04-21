import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import logo from '../helpers/logo.svg';
import song from '../helpers/Star_Wars_original_opening_crawl_1977.mp3';
import './Header.css';

function Header({ pageRefs }) {
  const [audio] = useState(new Audio(song));
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audio.play();
  }, [audio]);

  const audioToggle = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleScroll = () => {
    pageRefs.current.filters.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header>
      <button
        type="button"
        className="table-focus"
        onClick={ handleScroll }
        title="Ir para a aplicação"
      >
        <AiOutlineArrowDown />
      </button>
      <section className="logo">
        <img src={ logo } alt="star wars logo" />
      </section>
      <button
        type="button"
        onClick={ audioToggle }
        className="music-btn"
        title="Sound On/Off"
      >
        {isPlaying
          ? (<MdMusicNote />)
          : (<MdMusicOff />)}
      </button>
    </header>
  );
}

Header.propTypes = {
  pageRefs: PropTypes.objectOf(PropTypes.element).isRequired,
};

export default Header;
