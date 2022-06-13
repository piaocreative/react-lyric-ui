import { Numeric } from '@eo-locale/react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import type { FC } from 'react';
import { useSongAnalyze } from '../../hooks/useSongAnalyze';
import { InfoTooltip } from '../atoms/InfoTooltip';
import { SectionOverlay } from '../atoms/SectionOverlay';

interface Props {
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    padding: '10px 20px',
  },
  value: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: '60px',
  },
  changes: {
    marginTop: theme.spacing(1),
    display: 'inline-flex',
    backgroundColor: 'rgba(76, 175, 80, 0.29)',
    borderRadius: 3,
    lineHeight: '22px',
    padding: '0 7px',
    color: '#4caf50',
  },
}));

export const ProjectedListeners: FC<Props> = ({ loading }) => {
  const { projectedListeners } = useSongAnalyze();
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <SectionOverlay open={loading} />
      <Box>
        <Typography variant="body1">
          <InfoTooltip title="Lyric predicts how many listeners your songs will get on streaming platforms based on the performance of similar songs to yours in your genre">
            <span>Projected Listeners</span>
          </InfoTooltip>
        </Typography>
        <Typography className={classes.value} variant="h4">
          <Numeric value={loading ? 0 : projectedListeners.amount} />
        </Typography>
        <Box alignItems="center" className={classes.changes}>
          <TrendingUpIcon fontSize="small" />
          &nbsp;+
          <Numeric value={loading ? 0 : projectedListeners.historicalChange} />
        </Box>
      </Box>

      <Box
        alignItems="center"
        borderRadius={4}
        display="flex"
        height={76}
        justifyContent="center"
        style={{ backgroundColor: '#424242' }}
        width={76}
      >
        <img alt="Headphone" src={require('../../assets/headphone.svg').default} />
      </Box>
    </Paper>
  );
};
