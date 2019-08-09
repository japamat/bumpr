/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  slogans: {
    id: `${scope}.slogans`,
    defaultMessage: 'Slogans',
    description:
      'A list of marketing slogans using buzzwords. Data generated from Mockaroo.',
  },
});
