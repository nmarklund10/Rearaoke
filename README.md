[![nmarklund10](https://circleci.com/gh/nmarklund10/Rearaoke.svg?style=shield)](https://app.circleci.com/pipelines/github/nmarklund10/Rearaoke?filter=all)

# Rearaoke

[Live Website](https://rearaoke.herokuapp.com/)

This is a karaoke web application that lets you upload a [.lrc file](https://en.wikipedia.org/wiki/LRC_(file_format)) and an audio file.  Once the user presses play, the lyrics will be synchronously displayed on the screen to sing along to!  This was an [old project](https://github.com/nmarklund10/WebKaroke) of mine that I originally implemented with Flask (it's rough) 😅.

![App Screenshot](docs/images/screenshot.png)

## Dev Setup
### Docker
```
docker compose build
docker compose up
```

### Install dependencies
```
yarn install
```
### Run Development Mode
```
yarn start
```
### Run Production Mode
```
yarn build
yarn global add serve
serve -s build
```
