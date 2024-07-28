const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/discussions', require('./routes/discussionRoutes'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app; 
