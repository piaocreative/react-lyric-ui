import { Avatar, Box, Link, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Skeleton } from '@material-ui/lab';
import { FC, useEffect, useRef, useState } from 'react';
import { SimilarSong } from '../../model/SongAnalyze';

interface Props {
  song?: SimilarSong;
}

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    marginRight: theme.spacing(1.5),
    minWidth: 58,
  },
  avatarWrapper: {
    'overflow': 'hidden',
    'position': 'relative',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'cursor': 'pointer',

    '&:hover $play': {
      display: 'block',
    },

    '&:hover $avatar': {
      opacity: 0.2,
    },
  },
  play: {
    position: 'absolute',
    zIndex: 2,
    display: 'none',
  },
  avatar: {
    width: 58,
    height: 58,
    transition: 'all 0.2s',
  },
  title: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: '18px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: '18px',
  },
}));

export const SimilarSongPreview: FC<Props> = ({ song }) => {
  const isLoading = !song;
  const audio = useRef<HTMLAudioElement>();
  const [isPlaying, setIsPlayng] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    audio.current = new Audio(song?.url);
  }, [song?.url]);

  const play = () => {
    if (audio.current) {
      audio.current.play();
      setIsPlayng(true);
    }
  };

  const pause = () => {
    if (audio.current) {
      audio.current.pause();
      setIsPlayng(false);
    }
  };

  return (
    <ListItem disableGutters>
      <ListItemAvatar className={classes.listItemAvatar}>
        <div className={classes.avatarWrapper}>
          {isLoading ? (
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          ) : (
            <>
              {isPlaying ? (
                <PauseCircleOutlineIcon className={classes.play} fontSize="large" onClick={pause} />
              ) : (
                <PlayCircleOutlineIcon className={classes.play} fontSize="large" onClick={play} />
              )}
              <Avatar className={classes.avatar} src={song.albumArt} variant="rounded" />
            </>
          )}
        </div>
      </ListItemAvatar>
      {isLoading ? (
        <Box flex="1 0 auto">
          <Skeleton width="100%" />
          <Skeleton width="100%" />
        </Box>
      ) : (
        <ListItemText
          classes={{
            primary: classes.title,
            secondary: classes.subtitle,
          }}
          primary={
            <Link href={song?.url} target="_blank" rel="noreferrer">
              {song?.title}
            </Link>
          }
          secondary={song?.artist}
        />
      )}
    </ListItem>
  );
};
