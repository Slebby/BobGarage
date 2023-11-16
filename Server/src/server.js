const express = require('express');
const config = require('./config/config');
const db = require('./models');

// Routes
const feedback = require('./routes/feedback');
const auth = require('./routes/auth');
const user = require('./routes/users');
const blog = require('./routes/blog');
const carService = require('./routes/carService');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Use the imported routes.
app.use('/api/feedback', feedback);
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/blog', blog);
app.use('/api/service', carService);

db.sequelize.sync().then(() => {
    app.listen(config.port,
        () => console.log(`Server is running on port: ${config.port}`)
    );
});
