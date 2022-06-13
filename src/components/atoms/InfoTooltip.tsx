import { Tooltip, TooltipProps } from '@material-ui/core';
import type { FC } from 'react';

export const InfoTooltip: FC<TooltipProps> = ({ arrow = true, children, placement = 'top', title, ...rest }) => {
  return (
    <Tooltip arrow={arrow} placement={placement} title={title} {...rest}>
      {children}
    </Tooltip>
  );
};
