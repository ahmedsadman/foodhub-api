const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const restaurantRoutes = require('./routes/restaurant');
const blogRoutes = require('./routes/blog');

/* ----------------- Middlewares --------------- */
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

/* ----------------- Enable CORS ---------------- */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

/* ---------------- ROUTES -------------------- */
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/blog', blogRoutes);

/* --------------- Server --------------------- */
mongoose
	.connect(
		'mongodb+srv://admin:admin@samyo001-ksrpc.mongodb.net/foodhub?retryWrites=true',
		{ useNewUrlParser: true }
	)
	.then(() => {
		app.listen(port, () => console.log(`Server started at port ${port}`));
	})
	.catch(err => console.log(`ERROR: ${err}`));
