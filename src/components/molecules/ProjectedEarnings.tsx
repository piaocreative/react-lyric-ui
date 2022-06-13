import { makeStyles, Paper, Typography } from '@material-ui/core';
import type { FC } from 'react';
import { useSongAnalyze } from '../../hooks/useSongAnalyze';
import { Money } from '../atoms/Money';
import { SectionOverlay } from '../atoms/SectionOverlay';

interface Props {
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    height: '100%',
    padding: '10px 20px',
    backgroundImage: `url(${require('../../assets/wave.svg').default})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top 15px center',
    backgroundSize: 'cover',
  },
  value: {
    marginTop: theme.spacing(1),
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: '27px',
  },
}));

export const ProjectedEarnings: FC<Props> = ({ loading }) => {
  const { projectedEarnings } = useSongAnalyze();
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <SectionOverlay open={loading} />
      <Typography variant="body1">Projected Earnings</Typography>
      <Typography className={classes.value} variant="h4">
        <Money
          amount={loading ? 0 : Number(projectedEarnings.amount)}
          language="en"
          currency={projectedEarnings.currency}
        />
      </Typography>
    </Paper>
  );
};
