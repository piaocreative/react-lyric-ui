import { DateTime } from '@eo-locale/react';
import {
  Box,
  Button,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { Alert } from '@material-ui/lab';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { generatePath, useHistory } from 'react-router';
import { CatalogApi } from '../../api/Catalog.api';
import { Routes } from '../../config/Routes';
import { formatSongLength } from '../../utils/common';
import { FullscreenOverlay } from '../atoms/FullscreenOverlay';

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#484848',
      },
    },
  }),
)(TableRow);

export const Catalog: FC = () => {
  const history = useHistory();
  const { isLoading, error, data = [] } = useQuery('catalog', CatalogApi.fetchAll);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <FullscreenOverlay open={isLoading}>Loading your Catalog...</FullscreenOverlay>

      {!!error && (
        <Box marginBottom={2}>
          <Alert severity="error" variant="filled">
            {String(error)}
          </Alert>
        </Box>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Length</TableCell>
                <TableCell>Created Time</TableCell>
                <TableCell>Last Seen Time</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <StyledTableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{formatSongLength(Number(item.length))}</TableCell>
                  <TableCell>
                    <DateTime
                      day="numeric"
                      hour="numeric"
                      minute="numeric"
                      month="long"
                      value={new Date(item.created_time)}
                    />
                  </TableCell>
                  <TableCell>
                    <DateTime
                      day="numeric"
                      hour="numeric"
                      minute="numeric"
                      month="long"
                      value={new Date(item.last_seen_time)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => {
                        history.push(
                          generatePath(Routes.Dashboard, {
                            id: item.id,
                          }),
                        );
                      }}
                      startIcon={<LaunchIcon />}
                      size="small"
                      variant="contained"
                    >
                      Open
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 25]}
          component="footer"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
