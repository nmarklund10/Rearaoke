import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSongDuration, setSongCurrentTime, resetAudioValues,
         setSongSrc, initializeAudioValues, setSongSeekValue,
         setSongPlaying } from './songSlice';
import { setUploadError } from './uploadErrorSlice';

export default function Audio() {
  const dispatch = useDispatch();
  const audioRef = useRef();
  const src = useSelector((state) => state.song.value.src);
  const karaoke = useSelector((state) => state.song.value.karaoke);
  const songPlaying = useSelector((state) => state.song.value.songPlaying);
  const seekValue = useSelector((state) => state.song.value.seekValue);
  const volume = useSelector((state) => state.song.value.volume);

  useEffect(() => {
    dispatch(resetAudioValues());
    audioRef.current.src = src;
  }, [src, dispatch]);

  useEffect(() => {
    if (seekValue !== null) {
      audioRef.current.currentTime = seekValue;
      dispatch(setSongCurrentTime(audioRef.current.currentTime));
      dispatch(setSongSeekValue(null));
    }
  }, [seekValue, dispatch]);

  useEffect(() => {
    if (songPlaying !== null) {
      songPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [songPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const updateSongCurrentTime = () => {
    let newCurrentTime = audioRef.current.currentTime;
    dispatch(setSongCurrentTime(newCurrentTime));
  }

  const restartSong = () => {
    dispatch(setSongPlaying(null));
    dispatch(setSongSeekValue(0));
  }

  const onLoadAudioFile = (event) => {
    const lrcDuration = karaoke[karaoke.length - 1].end;
    const audioDuration = audioRef.current.duration;
    if (audioDuration < lrcDuration) {
      dispatch(setSongSrc(null));
      dispatch(setUploadError(`Audio file (${audioDuration}) is shorter than LRC indicates (${lrcDuration}).`));
    }
    else {
      dispatch(setSongDuration(audioDuration));
      dispatch(initializeAudioValues());
    }
  }

  return (
    <audio ref={audioRef} onLoadedMetadata={onLoadAudioFile}
           onTimeUpdate={updateSongCurrentTime} onEnded={restartSong}
           hidden/>
  );
}