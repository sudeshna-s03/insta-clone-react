import React from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, caption, imageURL}) {
  return <div>
      <div className="post">
          <div className="post_header">
          <Avatar className="post_avatar" alt="SuduMist"
           src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1579307395773x896318573488014000%2F157930731729444037.png?w=&h=&auto=compress&dpr=1&fit=max" />
           <h3>{username}</h3>
          </div>
          <img className="post_image" src={imageURL} alt=""></img>
          <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
      </div>
  </div>;
}

export default Post;
