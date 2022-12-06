### STAGE 1: Build ###
FROM node:16 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /usr/share/nginx/html/ui/
COPY --from=build /usr/src/app/dist/zero-waste-ui /usr/share/nginx/html/ui/
