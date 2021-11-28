import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function NowPlaying() {
  let song = useSelector((state) => state.song.value);
  const showNowPlaying = song.title !== null;
  let nowPlaying = <></>;

  if (showNowPlaying) {
    const songTitle = song.title !== '' ? song.title : 'Unnamed Song';
    if (song.artist !== null && song.artist !== '') {
      var songArtist =
        <>
          <span> by </span>
          <b>{song.artist}</b>
        </>;
    }
    nowPlaying =
      <Typography variant='h6'>
        <b>{songTitle}</b>{songArtist}
      </Typography>;
  }

  return nowPlaying;
}