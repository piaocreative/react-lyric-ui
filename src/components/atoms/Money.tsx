import { Numeric } from '@eo-locale/react';
import type { FC } from 'react';

interface MoneyProps extends Intl.NumberFormatOptions {
  amount: number;
  language: string;
}

export const Money: FC<MoneyProps> = ({ amount, language, ...shared }) => {
  // eslint-disable-next-line react/style-prop-object
  return <Numeric {...shared} language={language} style="currency" value={amount} />;
};
