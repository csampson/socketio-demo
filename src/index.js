import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Box, CssBaseline, TextField } from '@material-ui/core';

import './styles.css';

const theme = createMuiTheme({
  typography: {
    fontSize: 32,
  }
});

const socket = io();

socket.onAny((event, ...args) => {
  console.debug(event, args);
});

function App () {
  const [message, setMessage] = useState('');
  const [buffer, setBuffer] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    socket.send(message);
    event.preventDefault();
  };

  socket.on('message', (message) => {
    setBuffer([...buffer, message]);
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box width='50%'>
        <h1>Express yourself.</h1>

        <form onSubmit={handleSubmit} autoComplete='off' noValidate>
          <TextField onChange={handleChange} value={message} fullWidth />
        </form>

        <div className='stream'>
          {buffer.map(item => {
            return <p>{String(item)}</p>
          })}
        </div>
      </Box>
    </ThemeProvider>
  );
} 

ReactDOM.render(<App />, document.querySelector('main'));
