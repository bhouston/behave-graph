/* eslint-disable semi */

export interface ILogger {
  verbose(text: string): void;
  info(text: string): void;
  warn(text: string): void;
  error(text: string): void;
}
