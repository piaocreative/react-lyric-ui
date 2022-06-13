import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import type { FC, HTMLAttributes } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    fontWeight: 600,
  },
  large: {
    fontSize: 45,
    letterSpacing: 2,
  },
  small: {
    fontSize: 22,
    letterSpacing: 1,
  },
}));

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: 'large' | 'small';
}

export const Logo: FC<Props> = ({ children, className, size = 'large', ...rest }) => {
  const classes = useStyles();
  const imgSize = size === 'small' ? 24 : 50;

  return (
    <span
      className={classNames(
        {
          [classes.container]: true,
          [classes.large]: size === 'large',
          [classes.small]: size === 'small',
        },
        className,
      )}
      {...rest}
    >
      <img alt="Logo" height={imgSize} width={imgSize} src={require('../../assets/logo.png').default} />
      <span className={classes.title}>Lyric</span>
    </span>
  );
};
