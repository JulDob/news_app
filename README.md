## Running

### Method 1

```bash
cd client
npm install
npm start

cd server
npm install
npx prisma migrate dev --name init
npm run generate
npm run dev

sudo nginx -c <full path to nginx/local.conf> // if you want to use proxy
sudo nginx -s stop // for stopping
```

### Method 2

```bash
docker-compose up --build
```

#### Docker utils

```bash
docker build -f Dockerfile.dev -t <docker-repository-name> .
docker run -it -p 4002:3000 <docker-repository-name>
docker push <docker-repository-name>:latest

docker build -f Dockerfile.dev -t <docker-repository-name> .
docker run -it -p 4003:3000 <docker-repository-name>
docker push <docker-repository-name>:latest

docker system prune --all --force --volumes // clean docker data
```

#### Publish docker image

```bash
docker login
docker images
docker tag <hash> <docker-repository-name>
docker push <docker-repository-name>
```
