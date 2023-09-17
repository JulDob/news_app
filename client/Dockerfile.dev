FROM node:18-alpine
WORKDIR /app
COPY .npmrc .npmrc
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]
