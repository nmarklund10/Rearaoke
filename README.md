# Rearaoke

This is a karaoke web application that lets you upload a [.lrc file](https://en.wikipedia.org/wiki/LRC_(file_format)) and an audio file.  Once the user presses play, the lyrics will be synchronously displayed on the screen to sing along to!

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