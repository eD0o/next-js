import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const font_body = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'], // remove not lating caracteres
  display: 'swap', // shows the second font meanwhile the main is being charged
  variable: '--font-body',
});

export const font_external = localFont({
  src: '../fonts/Protest_Guerrilla/ProtestGuerrilla-Regular.ttf',
  weight: '400',
  variable: '--font-external',
  display: 'swap',
});
