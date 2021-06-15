const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

console.log('process.env.DATABASE_SERVICE_NAME',process.env.DATABASE_SERVICE_NAME);
console.log('process.env.MONGODB_USER',process.env.MONGODB_USER);
console.log('process.env.MONGODB_PASSWORD',process.env.MONGODB_PASSWORD);
console.log('process.env.MONGODB_DATABASE',process.env.MONGODB_DATABASE);
console.log('process.env.MONGODB_ADMIN_PASSWORD',process.env.MONGODB_ADMIN_PASSWORD);

mongoose
  .connect(
      `${process.env.DATABASE_SERVICE_NAME}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.DATABASE_SERVICE_NAME}:27017/${process.env.MONGODB_DATABASE}`,
      { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.get('/health', (req, res) => {
  console.log('Server is up and running...')
  res.send('Server is up and running');
});

app.get('/test', (req, res) => {
  console.log('Test GET request executed...')
  res.send('Test GET request executed');
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
