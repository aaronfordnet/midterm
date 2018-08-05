# Bendito

A responsive, team-built food-ordering and order management application that communicates with clients via SMS. Built with JavaScript, PostgreSQL, Express, Twilio API, Ajax, jQuery and HTML/CSS/SASS with Bootstrap.

## Final Product

!["Screenshot of responsive menu"](https://github.com/aaronfordnet/midterm/blob/master/docs/responsive.png?raw=true)
!["Screenshot of menu page"](https://github.com/aaronfordnet/midterm/blob/master/docs/order-page.png?raw=true)
!["Screenshot of placing order"](https://github.com/aaronfordnet/midterm/blob/master/docs/place-order.png?raw=true)
!["Screenshot of order status page"](https://github.com/aaronfordnet/midterm/blob/master/docs/order-placed.png?raw=true)
!["Screenshot of admin login"](https://github.com/aaronfordnet/midterm/blob/master/docs/admin-page.png?raw=true)
!["Screenshot of admin orders page"](https://github.com/aaronfordnet/midterm/blob/master/docs/orders-confirm.png?raw=true)
!["Screenshot of admin orders updated"](https://github.com/aaronfordnet/midterm/blob/master/docs/orders-status.png?raw=true)

## Project Setup

1. Fork and clone repository
2. `npm i` to install dependencies

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser
- EJS
- Express
- Knex
- moment
- Twilio

