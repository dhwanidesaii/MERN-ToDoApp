import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBebKDG2NU3PQXU5h-embFSizXvFiuBKJg",
  authDomain: "reduxtodo-ed7a6.firebaseapp.com",
  projectId: "reduxtodo-ed7a6",
  storageBucket: "reduxtodo-ed7a6.appspot.com",
  messagingSenderId: "903612647190",
  appId: "1:903612647190:web:4ba372dbb52e8afbb5b237",
  measurementId: "G-T1LG0VPR0L"
};

initializeApp(firebaseConfig);

function SignIn({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = getAuth();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Set displayName
      await updateProfile(result.user, { displayName: name });
      setUser({ ...result.user, displayName: name });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const inputClass = "todo-input w-full";
  const buttonClass = "todo-btn w-full";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#c6f3fa]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-[#0a357d] mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailSignIn} className="flex flex-col gap-4">
          {isSignUp && (
            <input
              type="text"
              className={inputClass}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className={inputClass}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={inputClass}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={buttonClass}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <div className="flex items-center justify-center my-2">
          <span className="text-gray-500">or</span>
        </div>
        <button onClick={handleGoogleSignIn} className="todo-btn bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 w-full">
          <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C33.973 32.438 29.418 35 24 35c-6.065 0-11-4.935-11-11s4.935-11 11-11c2.507 0 4.805.857 6.627 2.278l6.435-6.435C33.047 6.527 28.761 5 24 5 12.954 5 4 13.954 4 25s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.008 13 24 13c2.507 0 4.805.857 6.627 2.278l6.435-6.435C33.047 6.527 28.761 5 24 5c-7.732 0-14.313 4.388-17.694 10.691z"/><path fill="#FBBC05" d="M24 45c5.418 0 10.019-1.792 13.73-4.858l-6.342-5.207C29.418 35 24 35 24 35c-5.418 0-9.973-2.562-11.303-6.917l-6.571 4.819C9.687 40.612 16.268 45 24 45z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303C34.418 32.438 29.418 35 24 35c-5.418 0-9.973-2.562-11.303-6.917l-6.571 4.819C9.687 40.612 16.268 45 24 45c7.732 0 14.313-4.388 17.694-10.691z"/></g></svg>
          Sign in with Google
        </button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        <button
          className="clear-btn mt-2 w-full"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default SignIn; 