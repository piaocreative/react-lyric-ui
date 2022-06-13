import { Box, Button, Divider, FormControl, MenuItem, Select } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import { FC, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useSongAnalyze } from '../../hooks/useSongAnalyze';

export const SongPlayer: FC = () => {
  const { genres, url } = useSongAnalyze();
  const [isPlaying, setIsPlaying] = useState(false);
  const waveSurfer = useRef<WaveSurfer>();

  useEffect(() => {
    waveSurfer.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#9c27b0',
      progressColor: 'purple',
      height: 150,
    });

    waveSurfer.current.load(url);

    waveSurfer.current.on('play', () => setIsPlaying(true));
    waveSurfer.current.on('pause', () => setIsPlaying(false));

    return () => {
      waveSurfer.current?.destroy();
    };
  }, [url]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" component="header" padding={1.5}>
        <Button
          onClick={() => {
            waveSurfer.current?.playPause();
          }}
          color="primary"
          variant="contained"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowSharpIcon />}
        </Button>

        <FormControl variant="outlined" size="small">
          <Select value="no-value">
            <MenuItem value="no-value">Genre</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box id="waveform" height="150px" />
    </>
  );
};
