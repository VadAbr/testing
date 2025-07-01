type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogMessage {
  timestamp: string;
  level: LogLevel;
  message: string;
  error?: any;
  context?: Record<string, any>;
}

class Logger {
  private formatMessage(logData: LogMessage): string {
    const { timestamp, level, message, error, context } = logData;
    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (context) {
      logMessage += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }
    
    if (error) {
      logMessage += `\nError: ${error.message}`;
      if (error.stack) {
        logMessage += `\nStack: ${error.stack}`;
      }
    }
    
    return logMessage;
  }

  private log(level: LogLevel, message: string, error?: any, context?: Record<string, any>) {
    const logData: LogMessage = {
      timestamp: new Date().toISOString(),
      level,
      message,
      error,
      context,
    };

    console[level](this.formatMessage(logData));
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, undefined, context);
  }

  error(message: string, error?: any, context?: Record<string, any>) {
    this.log('error', message, error, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, undefined, context);
  }

  debug(message: string, context?: Record<string, any>) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, undefined, context);
    }
  }
}

export const logger = new Logger(); 