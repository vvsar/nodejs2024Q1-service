FROM node:20.11.0 as build-stage

WORKDIR /app

COPY . .

RUN npm install


FROM node:20.11.0-alpine

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE $PORT

CMD ["npm", "run", "start"]
