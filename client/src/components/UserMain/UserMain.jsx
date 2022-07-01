/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CatalogContainer from '../../containers/CatalogContainer.js';
import MyCollectionContainer from '../../containers/MyCollectionContainer.js';
import GameDetails from './GameDetails/GameDetails.jsx';
import ThreadsContainer from '../../containers/ThreadsContainer.js';
import UserInfo from './UserInfo.jsx';
import { logout } from '../../authentication/firebase';

function UserMain({ currentUser }) {
  const [gameDisplayed, toggleGameDisplay] = useState(false);
  const [gameThreadsDisplayed, toggleGameThreads] = useState(false);
  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState();
  const [username, setUsername] = useState('Joy Parker');
  const [userphoto, setUserphoto] = useState('https://i.postimg.cc/J4Knq464/Joy.png');
  const [playAudio, setPlayAudio] = useState(false);
  const navigate = useNavigate();

  const toggleGameView = (gameInfo) => {
    setGame(gameInfo);
    toggleGameDisplay(!gameDisplayed);
  };

  const toggleThreadsView = (selectedGame) => {
    setGame(selectedGame);
    setGameId(selectedGame.id);
    toggleGameThreads(!gameThreadsDisplayed);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const triggerEasterEgg = () => {
    setPlayAudio(true);
  };

  return (
    <div>
      <nav className="nav-bar">
        <h3 className="title">Games Collection</h3>
        <br />
        <Link className="link nav" to="/">Login</Link>
        <Link className="link nav" to="/UpdateProfile">Update Profile</Link>
        <div className="log-out">
          Logged in as
          <div>{currentUser.username}</div>
          <button type="button" className="logout_btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <UserInfo
        username={username}
        userphoto={userphoto}
      />
      <div className="container">
        <div className="collection">
          <MyCollectionContainer
            toggleGameView={toggleGameView}
            toggleThreadsView={toggleThreadsView}
            triggerEasterEgg={triggerEasterEgg}
          />
        </div>
        <div className="catalog">
          <CatalogContainer
            toggleGameView={toggleGameView}
            toggleThreadsView={toggleThreadsView}
            triggerEasterEgg={triggerEasterEgg}
          />
        </div>
      </div>
      <div className="clear">
        {gameDisplayed && (
          <GameDetails
            gameId={gameId}
            game={game}
            currentUser={currentUser}
            toggleThreadsView={toggleThreadsView}
            toggleGameView={toggleGameView} />
        )}
        {gameThreadsDisplayed && (
          <ThreadsContainer
            gameId={gameId}
            game={game}
            exitModal={toggleThreadsView}
          />
        )}
        <iframe width="560" height="315" src={playAudio && 'https://www.youtube.com/embed/Y6ljFaKRTrI?start=7&autoplay=1'} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen hidden />
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Y6ljFaKRTrI?controls=0&amp;start=6?autoplay=1"
          title="YouTube video player"
          allow="autoplay"
          hidden

        /> */}
      </div>
    </div>
  );
}

export default UserMain;
