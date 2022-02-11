import React, { useEffect, useState } from "react";
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from "@material-ui/core";

function App() {
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setopenSignIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email,  setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect( () => {
    const unsubscribe=auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        //user has logged in
      }else{
        //user has logged out
        setUser(null);
      }
    })
  }, [user, username]);
  useEffect( () => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: [doc.id] ,
        post: doc.data(),
      })));
    })
  }, []);

  const signUp =(event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message) );

    setOpen(false);
  }

  const signIn =(event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message) );

    setopenSignIn(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="App">
      <Modal
          open={open}
          onClose={() => setOpen(false)}
      >
        <div>
          <form className="app_signup">
            <Box sx={style}>
              <center>
                <img
                className="app__headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGnsUYjv3HAf5sXUgOZv74sjPw5L1cGhNIg&usqp=CAU"
                alt="" width="181" height="60"
                ></img>
              </center>
              <Input
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
              <Input
              email="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>SIGN UP</Button>
            </Box>
          </form>
        </div>
        </Modal>
        <Modal
          open={openSignIn}
          onClose={() => setopenSignIn(false)}
      >
        <div>
        <form className="app_signin">
          <Box sx={style}>
            <center>
              <img
              className="app__headerImage"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGnsUYjv3HAf5sXUgOZv74sjPw5L1cGhNIg&usqp=CAU"
              alt="" width="181" height="60"
              ></img>
            </center>
          <Input
          email="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signIn}>SIGN IN</Button>
          </Box>
        </form>
        </div>
        </Modal>
      <div className="app_header">
        <img className="app_headerImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGnsUYjv3HAf5sXUgOZv74sjPw5L1cGhNIg&usqp=CAU" alt="" width="181" height="60">
        </img>
        {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
      <div className="app_loginContainer">
        <Button onClick={() => setopenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>
          )
      }
      </div>
      {/* <Button onClick={handleOpen}>SIGN UP</Button> */}
      <div className="app_posts">
      {
        posts.map(({Id, post}) =>(
          <Post key={Id} username= {post.username} user={user} caption={post.caption} imageURL={post.imageURL}/>
        ))
      }
      </div>
       {user?.displayName ? (
              <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload</h3>
      )}
      {/* <ImageUpload /> */}
      {/* <Post username="Mistu" caption="WOW it works" imageURL="https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg" />
      <Post />
      <Post /> */}
    </div>
  );
}

export default App;
