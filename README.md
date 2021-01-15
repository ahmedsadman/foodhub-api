## Foodhub

Foodhub is a restaurant portal for food lovers where they can find restaurant according to their food choice. This project acts as a backend API for this kind of service. It uses NodeJS, Express and MongoDB.

In summary, users can search restaurants based on food, see details and order food. There will be admins (restaurant owners) and super-admins who can add and manage restaurants.

All the features the API can handle are given below:

-   User Login/Registration
-   Search restaurants according to food type
-   Filter and sort restaurant data
-   See details about each restaurant, like location, contact, reviews and food menu. Also accomodations listing such as Wifi, parking zone, rooftop etc.
-   Order food from different restaurants
-   Write review and rate restaurants based on service, taste, environment etc.
-   Admin endpoints to add restaurants, restaurant owners and other CRUD operations based on management
-   Write food blog

## Documentation

A Postman [documentation](https://documenter.getpostman.com/view/4839696/S11GRfHA) is available for the API.

## Usage

You need to create a `.env` file with the value for `MONGODB_DATABASE_URI` specifying the MongoDB database connection string.

The project has _Docker_ and _docker-compose_ integrated. Just running `docker-compose up` would be enough for local dev environment. In this case, make sure in the `.env` file the database connection listens to host `db`. So one example would be `MONGODB_DATABASE_URI=mongodb://db:27017/foodhub-test`

If you don't want to use Docker or don't have it for some reason, just install the dependencies using `npm install`. In `.env` file place the desired database connection string and start the server using `nodemon app.js`. Please note, it requires `NodeJS 10.x` to work properly. Higher versions might not work.

## Contributions

As always, contributions are much welcome. Just fork and make pull requests, that's it! I would really appreciate if someone can contribute on making a much better and detailed documentation using something like Swagger.
