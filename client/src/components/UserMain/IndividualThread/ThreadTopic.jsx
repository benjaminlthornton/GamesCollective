import React from 'react';
import { MdComment, MdReport, MdClear } from 'react-icons/md';

function ThreadTopic({ thread }) {
  return (
    <div>
      <div>
        <h2>{thread.title}</h2>
      </div>
      <div className="topic">
        <div className="postInfo">
          <span>{thread.username}</span>
          <span className="datePosted">{thread.date}</span>
          <div className="clear" />
        </div>
        <h3>{thread.title}</h3>
        <br />
        <p>
          {thread.body}
        </p>
      </div>
      <div>
        <span>{MdComment}</span>
        <span>{MdReport}</span>
      </div>
    </div>
  );
}

export default ThreadTopic;
