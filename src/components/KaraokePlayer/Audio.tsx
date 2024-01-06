import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSongDuration, setSongCurrentTime, resetAudioValues,
  setSongSrc, initializeAudioValues, setSongSeekValue,
  setSongPlaying, setSongKaraoke
} from '../../store/songSlice';
import { calculateLetterTimes } from '../../ts/lrcFileParser';
import { setUploadError } from '../../store/uploadErrorSlice';
import { RearaokeState } from '../../store/store.type';
import { UNINIT_NUM, UNINIT_STR } from '../../store/constants';

export const Audio = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const src = useSelector((state: RearaokeState) => state.song.value.src);
  const karaoke = useSelector((state: RearaokeState) => state.song.value.karaoke);
  const changeEnd = useSelector((state: RearaokeState) => state.song.value.changeEnd);
  const songPlaying = useSelector((state: RearaokeState) => state.song.value.songPlaying);
  const seekValue = useSelector((state: RearaokeState) => state.song.value.seekValue);
  const volume = useSelector((state: RearaokeState) => state.song.value.volume);

  useEffect(() => {
    dispatch(resetAudioValues());
    if (audioRef.current != null && src !== UNINIT_STR) {
      audioRef.current.src = src;
    }
  }, [src, dispatch]);

  useEffect(() => {
    if (audioRef.current != null) {
      audioRef.current.currentTime = seekValue;
      dispatch(setSongCurrentTime(audioRef.current.currentTime));
    }
    dispatch(setSongSeekValue(UNINIT_NUM));
  }, [seekValue, dispatch]);

  useEffect(() => {
    if (audioRef.current != null && songPlaying != null) {
      songPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [songPlaying]);

  useEffect(() => {
    if (audioRef.current != null && volume !== UNINIT_NUM) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateSongCurrentTime = () => {
    if (audioRef.current != null) {
      const newCurrentTime = audioRef.current.currentTime;
      dispatch(setSongCurrentTime(newCurrentTime));
    }
  };

  const restartSong = () => {
    dispatch(setSongPlaying(null));
    dispatch(setSongSeekValue(0));
  };

  const updateLastKaraokeEnd = (audioDuration: number) => {
    const newKaraoke = [...karaoke];
    const lastKaraoke = newKaraoke[karaoke.length - 1];
    newKaraoke[karaoke.length - 1] = {
      ...lastKaraoke,
      letters: calculateLetterTimes(lastKaraoke.start, lastKaraoke.lyric, audioDuration),
      end: audioDuration
    };
    dispatch(setSongKaraoke(newKaraoke));
  };

  const onLoadAudioFile = () => {
    if (audioRef.current == null) {
      return;
    }
    const lrcDuration = karaoke[karaoke.length - 1].end;
    const audioDuration = audioRef.current.duration;
    if (!changeEnd && (audioDuration < lrcDuration)) {
      dispatch(setSongSrc(UNINIT_STR));
      dispatch(setUploadError(`Audio file (${audioDuration}) is shorter than LRC indicates (${lrcDuration}).`));
    }
    else {
      dispatch(setSongDuration(audioDuration));
      dispatch(initializeAudioValues());
      if (changeEnd) {
        updateLastKaraokeEnd(audioDuration);
      }
      dispatch(setUploadError(null));
    }
  };

  const handleError = () => {
    if (src !== UNINIT_STR) {
      dispatch(setUploadError('Error loading provided audio file'));
    }
  };

  return (
    <audio ref={audioRef} onLoadedMetadata={onLoadAudioFile} onError={handleError}
      onTimeUpdate={updateSongCurrentTime} onEnded={restartSong}
      hidden />
  );
};