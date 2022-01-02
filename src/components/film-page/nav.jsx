import React, {useState} from 'react';
import {FILM_DATA_TYPES} from '../types';
import {Overview} from './overview';
import {Details} from './details';
import {Reviews} from './reviews';

const ActiveTab = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const Tabs = ({film}) => {
  const [state, setState] = useState(ActiveTab.OVERVIEW);

  const handleTabsChange = (evt) => {
    if (evt.target.tagName === `A`) {
      setState(evt.target.innerText);
    }
  };

  const getCurrentTab = () => {
    switch (state) {
      case ActiveTab.OVERVIEW:
        return <Overview film={film}/>;
      case ActiveTab.DETAILS:
        return <Details film={film}/>;
      case ActiveTab.REVIEWS:
        return <Reviews/>;
      default: throw new Error(`Unexpected tab name.`);
    }
  };

  return (
    <>
      <nav className="movie-nav movie-card__nav">
        <ul
          className="movie-nav__list"
          onClick={handleTabsChange}
        >
          <li className={state === ActiveTab.OVERVIEW ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a className="movie-nav__link">{ActiveTab.OVERVIEW}</a>
          </li>
          <li className={state === ActiveTab.DETAILS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a className="movie-nav__link">{ActiveTab.DETAILS}</a>
          </li>
          <li className={state === ActiveTab.REVIEWS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
            <a className="movie-nav__link">{ActiveTab.REVIEWS}</a>
          </li>
        </ul>
      </nav>
      {getCurrentTab()}
    </>
  );
};

Tabs.propTypes = FILM_DATA_TYPES;
