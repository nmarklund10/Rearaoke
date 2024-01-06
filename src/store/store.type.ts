import { Karaoke } from '../ts/lrcFile.types';

export type SongState = {
  value: {
    title: string,
    artist: string,
    karaoke: Karaoke,
    src: string,
    seekValue: number,
    currentTime: number,
    duration: number,
    songPlaying: boolean | null,
    volume: number,
    changeEnd: true
  }
}

export type UploadErrorState = {
  value: string | null
}

export type RearaokeState = {
  uploadError: UploadErrorState,
  song: SongState
}