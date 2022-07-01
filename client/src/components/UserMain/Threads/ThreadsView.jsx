import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdClear } from 'react-icons/md'
import ThreadsList from './ThreadsList';
import SingleThreadView from '../IndividualThread/SingleThreadView';
import AddThread from './AddThread';

function ThreadsView({ currentUser, game, exitModal }) {
  const [addThreadView, setAddThreadView] = useState(false);
  const [singleThreadView, setSingleThreadView] = useState(false);
  const [selectedThread, setSelectedThread] = useState({});
  const [singleThreadComments, setSingleThreadComments] = useState([]);
  const [threads, setThreads] = useState([]);

  const selectedGame = game.id || 0;
  console.table(threads);
  useEffect(() => {
    axios.get(`/comments/${selectedGame}`)
      .then((res) => {
        setThreads(res.data);
      })
      .catch((err) => console.log(err));
  }, [game]);

  const toggleAddThreadView = (event) => {
    event.preventDefault();
    setAddThreadView(!addThreadView);
  };

  const toggleSingleThreadView = (comment = {}) => {
    const childrenComments = [];
    threads.forEach((thread) => {
      if (thread.parent_id === comment.id) {
        childrenComments.push(thread);
      }
    });
    setSelectedThread(comment);
    setSingleThreadComments(childrenComments);
    setSingleThreadView(!singleThreadView);
  };

  const addThread = (thread) => {
    axios.post('/comments', thread)
      .then(() => (axios.get(`/comments/${game.id}`)))
      .then((res) => setThreads(res.data))
      .catch((err) => console.log(err));
  };

  const exit = (event) => {
    event.preventDefault();
    exitModal();
  };

  return (
    <div className="outerModal">
      <div className="modal">
        <div className="threadsView">
          <h2>{game.name}</h2>
          {singleThreadView && (
            <span onClick={toggleSingleThreadView}>Go Back to Discussions</span>
          )}
          <span onClick={exit}>{MdClear}</span>
          { !singleThreadView && (
          <ThreadsList
            toggleThreadView={toggleSingleThreadView}
            threads={threads}
          />
          )}
          {singleThreadView && (
          <SingleThreadView
            toggleThreadView={toggleSingleThreadView}
            thread={selectedThread}
            childComments={singleThreadComments}
            currentUser={currentUser}
            gameId={game.id}
            game={game.name}
            addThread={addThread}
          />
          )}
          <button
            type="button"
            onClick={toggleAddThreadView}
          >
            Add Thread
          </button>
          {addThreadView && (
          <AddThread
            toggleAddThread={toggleAddThreadView}
            addThread={addThread}
            threads={threads}
            currentUser={currentUser}
            gameId={game.id}
          />
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreadsView;
