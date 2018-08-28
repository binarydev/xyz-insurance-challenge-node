FROM "node:8.10"
SHELL ["/bin/bash", "-c"]
EXPOSE 3001
COPY . /app
WORKDIR /app
RUN rm -Rf node_modules
RUN rm -Rf frontend/node_modules
RUN yarn install:all
CMD yarn start:prod