import { Box, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import { CatalogApi } from '../api/Catalog.api';
import { SongsApi } from '../api/Songs.api';
import { FullscreenOverlay } from '../components/atoms/FullscreenOverlay';
import { GridArea } from '../components/atoms/GridArea';
import { DashboardMain } from '../components/molecules/DashboardMain';
import { InnerLayout } from '../components/molecules/InnerLayout';
import { ProjectedEarnings } from '../components/molecules/ProjectedEarnings';
import { ProjectedListeners } from '../components/molecules/ProjectedListeners';
import { ProjectStats } from '../components/molecules/ProjectStats';
import { SimilarSongs } from '../components/molecules/SimilarSongs';
import { SongAnalyzeContext } from '../components/molecules/SongAnalyzeContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateAreas: `
      "earnings listeners stats"
      "main main stats"
      "main main similar"
    `,
    gridTemplateColumns: '1fr 1fr 350px',
    gap: 16,
    paddingBottom: theme.spacing(3),
  },
}));

export const DashboardPage: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const songId = Number(match.params.id);
  const songAnalyzeQuery = useQuery(['songAnalyze', songId], () => CatalogApi.fetch(songId));
  const trackQuery = useQuery(
    ['track', songAnalyzeQuery.data?.songCharacteristics.TrackID],
    () => SongsApi.get(String(songId), String(songAnalyzeQuery.data?.songCharacteristics.TrackID)),
    {
      enabled: Boolean(songAnalyzeQuery.data?.songCharacteristics.TrackID),
      retry: 15,
    },
  );
  const classes = useStyles();

  if (trackQuery.data && songAnalyzeQuery.data) {
    songAnalyzeQuery.data.genres = trackQuery.data.genres;
    songAnalyzeQuery.data.projectedEarnings = trackQuery.data.projectedEarnings;
    songAnalyzeQuery.data.projectedListeners = trackQuery.data.projectedListeners;
    songAnalyzeQuery.data.songCharacteristics = trackQuery.data.songCharacteristics;
    songAnalyzeQuery.data.score.overall = trackQuery.data.score.overall;
  }

  const isLoading = !trackQuery.data;

  return (
    <InnerLayout>
      <FullscreenOverlay open={songAnalyzeQuery.isLoading} />

      {!!songAnalyzeQuery.error && (
        <Box marginBottom={2}>
          <Alert severity="error" variant="filled">
            {String(songAnalyzeQuery.error)}
          </Alert>
        </Box>
      )}

      {!!songAnalyzeQuery.data && (
        <SongAnalyzeContext.Provider value={songAnalyzeQuery.data}>
          <Box className={classes.container}>
            <GridArea name="earnings">
              <ProjectedEarnings loading={isLoading} />
            </GridArea>
            <GridArea name="listeners">
              <ProjectedListeners loading={isLoading} />
            </GridArea>
            <GridArea name="main">
              <DashboardMain />
            </GridArea>
            <GridArea name="stats">
              <ProjectStats
                loading={isLoading}
                items={
                  trackQuery.data?.score.impactful_attributes
                    .map((item) => ({
                      score: item.attribute_score,
                      title: item.attribute_name,
                    }))
                    .concat([
                      {
                        title: 'Star Factor',
                        score: trackQuery.data?.score.starFactor,
                      },
                    ]) ?? []
                }
              />
            </GridArea>
            <GridArea name="similar">
              <SimilarSongs />
            </GridArea>
          </Box>
        </SongAnalyzeContext.Provider>
      )}
    </InnerLayout>
  );
};
