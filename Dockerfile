# pull official base image
FROM node:20

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install && yarn cache clean

# add app
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build && yarn global add serve

# start app
CMD ["serve", "-s", "dist"]