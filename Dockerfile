# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build
RUN yarn global add serve

# start app
CMD ["serve", "-s", "build"]