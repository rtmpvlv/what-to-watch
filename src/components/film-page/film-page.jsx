import React from 'react';
import {useParams, useHistory, Link} from 'react-router-dom/cjs/react-router-dom.min';
import {FilmsList} from '../films-list/films-list';
import {Footer} from '../footer/footer';
import {HeaderLink} from '../header-link/header-link';
import {FILMS_DATA_TYPES} from '../types';
import {UserBlock} from '../user-block/user-block';

export const FilmPage = ({filmsData}) => {
  const similarListLength = {
    START: 0,
    MAX: 4,
  };

  const currentId = Number(useParams().id);
  const currentFilm = filmsData.find((film) => film.id === currentId);
  const {id, name, posterImage, backgroundImage, description, rating, scoresCount, director, starring, genre, released} = currentFilm;

  const history = useHistory();
  const handlePlayMovie = () => {
    history.push(`/player/${id}`);
  };

  const similarFilms = filmsData.filter((film) => currentFilm !== film && currentFilm.genre === film.genre);
  if (similarFilms.length > similarListLength.MAX) {
    similarFilms.slice(similarListLength.START, similarListLength.MAX);
  }

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <HeaderLink/>
            </div>
            <UserBlock/>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>
              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={handlePlayMovie}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <a href="#" className="movie-nav__link">Overview</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>
              <div className="movie-rating">
                <div className="movie-rating__score">{rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">Very good</span>
                  <span className="movie-rating__count">{scoresCount} ratings</span>
                </p>
              </div>
              <div className="movie-card__text">
                <p>{description}</p>
                <p className="movie-card__director"><strong>Director: {director}</strong></p>
                <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList filmsData={similarFilms}/>
        </section>
        <Footer/>
      </div>
    </>
  );
};

FilmPage.propTypes = FILMS_DATA_TYPES;
