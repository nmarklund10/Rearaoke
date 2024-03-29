[![nmarklund10](https://circleci.com/gh/nmarklund10/Rearaoke.svg?style=shield)](https://app.circleci.com/pipelines/github/nmarklund10/Rearaoke?filter=all)

# Rearaoke

[Live Website](https://rearaoke-d39ee58f8591.herokuapp.com/)

This is a karaoke web application that lets you upload a [.lrc file](https://en.wikipedia.org/wiki/LRC_(file_format)) and an audio file.  Once the user presses play, the lyrics will be synchronously displayed on the screen to sing along to!

![App Screenshot](docs/images/screenshot.png)

## Dev Setup
### Docker
```
docker compose build
docker compose up # connect at http://localhost:3001
```

### Install dependencies
```
yarn install
```
### Run Development Mode
```
yarn dev
```
### Create Production Build
```
yarn build
```
### Run Production Mode
#### On Remote Server
```
yarn build
yarn global add serve
serve -s dist
```
#### On Local Machine
```
yarn preview
```
#### On Heroku
```
yarn start
```
