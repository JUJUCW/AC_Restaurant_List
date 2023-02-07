const express = require('express');
const app = express();
const port = 3000;

const exphbs = require('express-handlebars');

// import restaurant.json
const restaurantList = require('./restaurant.json');

// express template engin
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setting static files
app.use(express.static('public'));

// routes setting
app.get('/', (req, res) => {
    res.render('index', { restaurantList: restaurantList.results });
});
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    const restaurants = restaurantList.results.filter((restaurant) =>
        (restaurant.name + restaurant.category).toLowerCase().includes(keyword.toLowerCase())
    );

    res.render('index', { restaurantList: restaurants, keyword });
});

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(
        (restaurant) => restaurant.id.toString() === req.params.restaurant_id
    );
    res.render('show', { restaurant });
});

// start & listen on the Express server
app.listen(port, () => {
    console.log(`Now is listening on http://localhost:${port}`);
});
