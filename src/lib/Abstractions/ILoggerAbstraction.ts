/* eslint-disable semi */

export default interface ILoggerAbstraction {
    verbose(text: string): void;
    info(text: string): void;
    warn(text: string): void;
    error(text: string): void;
}
