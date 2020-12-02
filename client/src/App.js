import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Home from './components/Home';
const socket = io('http://localhost:3001');

const App = () => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [recieverId, setRecieverId] = useState();
  const [messages, setMessages] = useState([]);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    socket.on('users', (users) => setUsers(users));
    socket.on('recieve_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('exit', (data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(e.target.username.value);
    socket.emit('new_user', e.target.username.value);
    e.target.username.value = '';
  };

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('new_msg', {
      message: e.target.message.value,
      recieverId,
      sentBy: user,
    });
    e.target.message.value = '';
  };

  const usersOnline = users?.filter((item) => item.username !== user);
  return (
    // <>
    //   <Home />
    // </>
    <>
      {!user && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" required></input>
          <button type="submit">Create</button>
        </form>
      )}
      {user && (
        <>
          <h1>LoggedIn User: {user}</h1>
          {usersOnline?.length > 0 && <h1>Users Online</h1>}
          {usersOnline?.map((user) => (
            <p key={user.id} onClick={() => setRecieverId(user.id)}>
              {user.username}
            </p>
          ))}
          <h1>Messages</h1>
          <ul>
            {messages.map((data) => (
              <>
                <span>{data.sentBy}</span>
                <li>{data.message}</li>
              </>
            ))}
          </ul>
          <form onSubmit={handleSend}>
            <input type="text" name="message" required></input>
            <button type="submit">Send</button>
          </form>
        </>
      )}
      <p>I rendered {renderCount.current} times</p>
    </>
  );
};

export default App;
