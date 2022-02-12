import React, { useEffect, useState } from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase/compat/app';

function Post({postId, user, username, caption, imageURL}) {
  const[comments, setComments] = useState([]);
  const[comment, setComment] = useState('');
  useEffect(() =>{
    let unsubscribe;
    if (postId) {
      unsubscribe=db
       .collection("posts")
       .doc(postId)
       .collection("comments")
       .orderBy('timestamp','desc')
       .onSnapshot((snapshot) => {
         setComments(snapshot.docs.map((doc) => doc.data()))
       });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    console.log(postId);
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }
  return (
      <div className="post">
          <div className="post_header">
          <Avatar className="post_avatar" alt="SuduMist"
           src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1579307395773x896318573488014000%2F157930731729444037.png?w=&h=&auto=compress&dpr=1&fit=max" />
           <h3>{username}</h3>
          </div>
          <img className="post_image" src={imageURL} alt=""></img>
          <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
          <div className="post_comments">
            {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong>{comment.text}
              </p>
            ))}
          </div>
          <form className='post_commentbox'>
            <input
            className='post_input'
            type="text"
            placeholder='add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <button
            className='post_button'
            disabled={!comment}
            type="submit"
            onClick={postComment}
            >
              Post</button>
          </form>
      </div>
  
  )
}

export default Post;
