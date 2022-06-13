import { Backdrop, BackdropProps, Box, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import type { FC } from 'react';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.common.white,
  },
}));

export const FullscreenOverlay: FC<BackdropProps> = ({ className, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classNames(classes.backdrop, className)} {...rest}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        fontSize={16}
        justifyContent="center"
        style={{ gap: 5 }}
      >
        <img alt="Loading" src={require('../../assets/loading.gif').default} width={80} height={80} />
        {children}
      </Box>
    </Backdrop>
  );
};
