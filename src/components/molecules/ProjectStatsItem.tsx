import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import type { FC } from 'react';
import { useAnimatedNumericValue } from '../../hooks/useAnimatedNumericValue';
import { GridArea } from '../atoms/GridArea';

interface Props {
  score: number;
  title: string;
  name: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(181, 158, 220, 0.38)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 120,
    gap: theme.spacing(1),
  },
  title: {
    lineHeight: '16px',
    textTransform: 'capitalize',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: '55px',
  },
  progress: {
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    borderRadius: 6,
  },
  progressBar: {
    borderRadius: 6,
  },
  item1: {
    backgroundColor: '#f4516c',
  },
  item2: {
    backgroundColor: '#4db6ac',
  },
  item3: {
    backgroundColor: '#4fc3f7',
  },
  item4: {
    backgroundColor: '#ffb74d',
  },
}));

export const ProjectStatsItem: FC<Props> = ({ name, score: targetScore, title }) => {
  const score = useAnimatedNumericValue(targetScore, 20);
  const classes = useStyles();

  return (
    <GridArea key={title} name={name} className={classes.paper}>
      <Typography className={classes.title} variant="body1">
        {title}
      </Typography>
      <Typography variant="h5" className={classes.value}>
        {score}
      </Typography>
      <Box width="90%">
        <LinearProgress
          classes={{
            root: classes.progress,
            bar: classNames(classes.progressBar, (classes as any)[name]),
          }}
          value={score}
          variant="determinate"
        />
      </Box>
    </GridArea>
  );
};
