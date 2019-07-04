const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

///////////////
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to the ContactKeeper API' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
