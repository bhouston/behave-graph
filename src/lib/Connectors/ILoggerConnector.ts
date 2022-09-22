/* eslint-disable semi */

export default interface ILoggerConnector {
    verbose(text: string): void;
    info(text: string): void;
    warn(text: string): void;
    error(text: string): void;
}
