import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { RearaokeState } from '../../store/store.type';
import { UNINIT_STR } from '../../store/constants';

export const NowPlaying = () => {
  const title = useSelector((state: RearaokeState) => state.song.value.title);
  const artist = useSelector((state: RearaokeState) => state.song.value.artist);
  const showNowPlaying = title !== UNINIT_STR;
  let nowPlaying = <></>;

  if (showNowPlaying) {
    const songTitle = title !== '' ? title : 'Unnamed Song';
    let songArtist = <></>;
    if (artist !== UNINIT_STR && artist !== '') {
      songArtist =
        <>
          <span> by </span>
          <b>{artist}</b>
        </>;
    }
    nowPlaying =
      <Typography variant='h6'>
        <b>{songTitle}</b>{songArtist}
      </Typography>;
  }

  return nowPlaying;
};