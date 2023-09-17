FROM node:18-alpine as builder
WORKDIR /app
COPY .npmrc .npmrc
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY ./ ./
CMD ["npm", "run", "build"]


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
