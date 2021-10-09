import { createSlice } from '@reduxjs/toolkit';
import { stringToSeconds } from '../../js/time';

class Song {
  constructor(lrc_file) {
    this.intervalId = 0;
    this.error = '';
    this.valid = true;
    this.title = '';
    this.artist = '';
    this.length = 0;
    this.lyrics = [];
    this.karoke = [];
    this.played = false;
    this.parse_lrc(lrc_file);
  }

  parse_lrc(file) {
    file = file.replace('\r', '');
    file = file.split('\n');
    if (!this.decompressLyrics(file)) {
      return;
    }
    this.buildKaroke()
  }

  buildKaroke() {
    for (let [i, lyric] of this.lyrics.entries()) {
      let previousLyric = (i === 0) ? {end: 0} : this.karoke[this.karoke.length - 1]
      if (lyric.lyric === "") {
        this.karoke[this.karoke.length - 1].end = lyric.time;
      }
      else {
        if (lyric.time - previousLyric.end >= 4) {
          this.karoke.push({
            start: previousLyric.end + 1,
            lyric: "[break]",
            end: lyric.time - 1
          });
        }
        this.karoke.push({
          start: lyric.time,
          lyric: lyric.lyric,
          end: this.length
        });
      }
    }
    this.lyrics = null;
    this.currentPosition = 0;
  }

  decompressLyrics (file) {
    for (let line of file) {
      this.parseLrcLine(line)
      if (!this.valid) {
        return false;
      }
    }
    this.lyrics.sort((a, b) => { return a.time - b.time });
    this.length = this.lyrics[this.lyrics.length - 1].time
    return true;
  }

  parseLrcLine(line) {
    line = line.trim();
    if (line !== "") {
      let regex = /\[[^\]]*\]/g
      let bracketMatches = line.match(regex)
      if (bracketMatches.length > 0) {
        let lyric = this.getNonBracketText(line, bracketMatches);
        for (let match of bracketMatches) {
          match = match.substr(1, match.length - 2);
          let colonIndex;
          if (this.isTimeStamp(match)) {
            this.handleLyricLine(match, lyric);
          }
          else if ((colonIndex = match.indexOf(':')) !== -1) {
            this.handleMetaLine(match, colonIndex);
          }
          else {
            this.setError(`Invalid line found in LRC file: ${line}`)
            break;
          }
        }
      }
      else {
        this.setError(`Invalid line found in LRC file: ${line}`)
      }
    }
  }

  handleLyricLine(bracketText, lyric) {
      let timestamp = stringToSeconds(bracketText);
      this.lyrics.push({
          time: timestamp,
          lyric: lyric
      })
  }

  handleMetaLine(bracketText, colonIndex) {
    let [field, text] = [bracketText.slice(0, colonIndex),
                         bracketText.slice(colonIndex + 1).trim()]
    switch(field) {
      case 'ar':
        this.artist = text;
        break;
      case 'ti':
        this.title = text;
        break;
      default:
        break;
    }
  }

  getNonBracketText(line, bracketMatches) {
    let lastMatch = bracketMatches[bracketMatches.length - 1];
    let splitIndex = line.indexOf(lastMatch) + lastMatch.length;
    return line.substr(splitIndex);
  }

  isTimeStamp(text) {
    let timestampRegex = /\d\d:\d\d\.\d\d/;
    let match = text.match(timestampRegex);
    if (match) {
      if (match[0] === text) {
        return true;
      }
    }
    return false;
  }

  // startKaroke(event) {
      // let len = document.getElementById("upcoming").textContent.length - 1;
      // this.intervalId = setInterval(this.karoke, 3000/len, this);
      // updateCurrentSongTime(event.srcElement.currentTime)
  // }

  // karoke(song_inst) {
  //     let karokePos = document.getElementById("karokePos");
  //     let upcoming = document.getElementById("upcoming");
  //     if (upcoming.textContent.length === 0) {
  //         clearInterval(song_inst.intervalId);
  //         return;
  //     }
  //     karokePos.textContent += upcoming.textContent[0];
  //     upcoming.textContent = upcoming.textContent.substr(1);
  // }

  setError(msg) {
    this.error = msg;
    this.valid = false;
    this.lyrics = [];
    this.karoke = [];
  }
}

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    value: null,
  },
  reducers: {
    setSong: (state, action) => {
      state.value = new Song(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSong } = songSlice.actions

export default songSlice.reducer