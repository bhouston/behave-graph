export type LogSeverity = 'verbose' | 'info' | 'warning' | 'error';
export interface ILogger {
  log(severity: LogSeverity, text: string): void;
}
