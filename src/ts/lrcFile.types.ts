export type Line = {
  start: number,
  lyric: string
  end: number,
  letters: number[]
}

export type Karaoke = Line[]

export type Song = {
  title: string,
  artist: string,
  karaoke: Karaoke,
  src: string,
  seekValue?: number,
  currentTime: number,
  duration: number,
  songPlaying?: boolean,
  volume: number,
  changeEnd: boolean
}

export type ParsedLrcFile = {
  title: string,
  artist: string,
  karaoke: Karaoke,
  changeEnd: boolean
}

export type ParsedLyricLine = {
  time: number,
  lyric: string
}

export type ParsedArtistLine = {
  artist: string
}

export type ParsedTitleLine = {
  title: string
}

export type ParsedLrcLine = ParsedLyricLine | ParsedArtistLine | ParsedTitleLine

export type RawLrcFile = {
  song: {
    value: Song
  }
}