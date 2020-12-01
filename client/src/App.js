import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3001';
const socket = socketIOClient(ENDPOINT);

function App() {
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState(null);
  const inputRef = useRef(1);
  useEffect(() => {
    inputRef.current = inputRef.current + 1;
  });

  useEffect(() => {
    socket.on('RECIEVE_MESSAGE', (msg) => {
      setResponse((prev) => [...prev, msg]);
    });

    socket.on('message', (msg) => {
      setResponse((prev) => [...prev, msg]);
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('SEND_MESSAGE', {
      message: e.target.message.value,
      user:
        user === 'guru.apr21@gmail.com'
          ? 'hanushajp@gmail.com'
          : 'guru.apr21@gmail.com',
    });
    e.target.message.value = '';
  };

  const handleUser = (e) => {
    e.preventDefault();
    socket.emit('join', { email: e.target.user.value });
    setUser(e.target.user.value);
  };

  return (
    <>
      {user ?? (
        <form onSubmit={handleUser}>
          <input type="text" name="user"></input>
          <button type="submit">Create</button>
        </form>
      )}

      <ul>
        {response.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message"></input>
        <button type="submit">send</button>
      </form>
      <p>I rendered {inputRef.current} times</p>
    </>
  );
}

export default App;
