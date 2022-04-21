import React, { useEffect, useState } from 'react';
import logo from '../helpers/logo.svg';
import './Welcome.css';

function Welcome() {
  const [renderLongtime, setRenderLongTime] = useState(true);

  useEffect(() => {
    const timeout = 2000;
    const timer = setTimeout(() => {
      setRenderLongTime(false);
    }, timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="welcome">
      {renderLongtime
      && (
        <h1 className="intro-text">
          A Long Time Ago, in a galaxy far,
          <br />
          {' '}
          far away…
        </h1>
      )}
      <div className="logo"><img src={ logo } alt="star wars logo" /></div>
      <div className="text-board">
        <div className="text-content">
          <p className="text-title">Episode XV</p>
          <p className="text-subtitle">REACT HOOKS</p>
          <br />
          <p>
            Turmoil has engulfed the Galactic Empire as Lalá Nametala
            keeps on studying to become a master in her trade.
          </p>
          <p>
            {`In her quest for knowledge, Lalá has developed this application applying
            the subjects from Block XV at Trybe's Web Development course:
            Context API and Hooks.`}
          </p>
          <p>
            This ultimate application lists and filters planets from the Galactic Empire.
          </p>
          <p>
            This future Web Developer heads to the BackEnd module hoping to
            learn its hidden trades and restore freedom to the galaxy….
          </p>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
