# XYZ Insurance - Code Challenge

## Intention of this challenge

Given the 5 tasks and additional requirements below, try to complete as many as possible withing a given timespan of 3-4 hours.

Tech stack:
- Node (8.10.x)
- Yarn (1.9.x)
- Mongo (4.x)
- React
- Webpack (via react-scripts)

1. Task 1 - A basic, responsive, single-page application with a simple, clear UI containing text and images for the homepage, along with a hardcoded "News" section that reads "Coming Soon!" **(Complete)**
2. Task 2 - Add a CRUD component to allow admins to manage the "News" section with HTML in the bodies of articles and a timestamp **(Complete)**
3. Task 3 - Integrate with the Amazing Quote API using the API docs provide in the challenge PDF document to allow the entry of user information to provide a fast, easy quote via email
4. Task 4 - Instead of sending quotes instantly, batch them into hourly emails, so that recipients of multiple quotes only get 1 email an hour. A message queue and a cronjob would be handy here.
5. Task 5 - Compute metrics for the service using logfiles from the app server. **(Complete)**

## Instructions for starting app

### Configuration

1. Run `yarn install:all`
2. Copy `.env.sample` to `.env` and update the variables to match your environment and desired settings.
3. Once you have started the server (below), there are 2 convenience routes that you can use to create your first user by making the following request and then deleting the route from `./routes/users.js` before restarting your server:

```POST /users
Host: localhost:3001
Content-Type: application/json

{"user":{ "email": "user@email.com", "pass": "12345"}}
```

**NOTE:** User passwords are encrypted, so adding the user manually via a mongodb GUI will not work.

### Production

You can start the app in production mode by running `yarn start:prod` in the root of the project. This will compile the frontend assets, which will be served by the backend. By default it runs on port 3001, but this can be modified via the `.env` file's WEB_API_PORT variable.

### Development

You can start the app for development by running `yarn start:dev` in the root for the backend, and in a separate terminal window run `cd frontend && yarn start` to start the frontend webpack dev server. You can access the dev server via http://localhost:3000.

Both the frontend and backend are set up to have hot-reloading as changes are made to the source files. To work with frontend reloading in place for development, use port http://localhost:3000. If you only want to test the backend via an API tool like Postman, use http://localhost:3001. This will have backend reloading in place, but frontend will not be served via port 3001 unless you have already run `cd frontend && yarn build` on your own. 

If you want to prevent hot reloading altogether, then run `cd frontend && yarn build && cd ../ && yarn start:dev`. This command will precompile the frontend assets and start the backend server normally, which will serve the assets for you. With this setup there will only be one server running, on http://localhost:3001. This port can be modified via the `.env` file's WEB_API_PORT variable.

### Docker (Production)

This repo includes a docker-compose.yml file, which can be executed by running `docker-compose up -d`. The `-d` flag is optional, so it can be removed if you want to run it in the foreground as a blocking process. This compose file will spin up a local mongodb container and a local node container that will compile the frontend assets and serve them along with the API for production purposes. If you use this file, you can skip the creation of your own `/.env` file so that you can modify the environment variables directly in the docker-compose.yml file. Otherwise, these 2 environment var groupings will override one another.