/**
 * Prevents server-only modules from being bundled by Webpack
 * (particularly useful in App Router API handlers)
 */

export const externalsToExcludeFromBundle = [
  'pg',
  'pg-native',
  'sequelize',
];
