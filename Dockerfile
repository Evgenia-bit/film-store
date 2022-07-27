FROM node

WORKDIR /film-store

COPY package*.json /film-store

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]