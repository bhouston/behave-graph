/* eslint-disable no-console */

import { EventEmitter } from '../Events/EventEmitter.js';

export enum LogLevel {
  Verbose = 0,
  Info = 1,
  Warn = 2,
  Error = 3
}

export enum PrefixStyle {
  None = 0,
  Time = 1
}

const Reset = '\x1b[0m';
const FgRed = '\x1b[31m';
const BgYellow = '\x1b[43m';
const Dim = '\x1b[2m';

export class Logger {
  static logLevel = LogLevel.Info;
  static prefixStyle = PrefixStyle.None;

  public static readonly onVerbose = new EventEmitter<string>();
  public static readonly onInfo = new EventEmitter<string>();
  public static readonly onWarn = new EventEmitter<string>();
  public static readonly onError = new EventEmitter<string>();

  static {
    const prefix = () => {
      switch (Logger.prefixStyle) {
        case PrefixStyle.None:
          return '';
        case PrefixStyle.Time:
          return new Date().toLocaleTimeString().padStart(11, '0') + ' ';
      }
    };

    Logger.onVerbose.addListener((text: string) => {
      if (Logger.logLevel > LogLevel.Verbose) return;
      console.log(prefix() + `${Dim}${text}${Reset}`);
    });
    Logger.onInfo.addListener((text: string) => {
      if (Logger.logLevel > LogLevel.Info) return;
      console.log(prefix() + `${text}`);
    });
    Logger.onWarn.addListener((text: string) => {
      if (Logger.logLevel > LogLevel.Warn) return;
      console.warn(prefix() + `${BgYellow}${text}${Reset}`);
    });
    Logger.onError.addListener((text: string) => {
      console.error(prefix() + `${FgRed}${text}}${Reset}`);
    });
  }

  static verbose(text: string) {
    this.onVerbose.emit(text);
  }

  static info(text: string) {
    this.onInfo.emit(text);
  }

  static warn(text: string) {
    this.onWarn.emit(text);
  }

  static error(text: string) {
    this.onError.emit(text);
  }
}
