import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../fireBase/firebase.init';
const Login = () => {
  const [user, setUser] = useState(null);
    const auth = getAuth(app);
   const provider = new GoogleAuthProvider();


    const handleGoogleSignIn = ()=>{
        signInWithPopup(auth, provider)
        .then(result =>{
        const loginUser = result.user;
        console.log(loginUser)
        setUser(loginUser);
        })
        .catch(error => {
                console.log(error)
        })
    }
    const handleSignOut = ()=>{
        signOut(auth)
        .then(result=>{
       console.log(result)
       setUser(null)
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>{ user ?
            <button onClick={handleSignOut}>Sign Out</button> :
           <button onClick={handleGoogleSignIn}>Google Login</button> }
            { user &&
                <div>
                    <h3>User :{user.displayName}</h3>
                    <h5>Email : {user.email}</h5>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;