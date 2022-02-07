import React, { useEffect, useState } from "react";
import './App.css';
import Post from './Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);
  useEffect( () => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  return (
    <div className="App">
      <div className="app_header">
        <img className="app_headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGnsUYjv3HAf5sXUgOZv74sjPw5L1cGhNIg&usqp=CAU" alt="" width="181" height="60">
        </img>
      </div>
      {
        posts.map(post =>(
          <Post username= {post.username} caption={post.caption} imageURL={post.imageURL}/>
        ))
      }
      <Post username="Mistu" caption="WOW it works" imageURL="https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg" />
      <Post />
      <Post />
    </div>
  );
}

export default App;
