// lib/logger.ts
export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
  }
  
  interface LogData {
    message: string;
    context?: Record<string, unknown>;
    level: LogLevel;
    timestamp: string;
    userId?: string;
  }
  
  export class Logger {
    private static instance: Logger;
    private supabaseTable = 'logs';
    
    private constructor() {}
    
    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
    
    async log(
      level: LogLevel,
      message: string,
      context?: Record<string, unknown>,
      userId?: string
    ): Promise<void> {
      const logData: LogData = {
        message,
        context,
        level,
        timestamp: new Date().toISOString(),
        userId
      };
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        this.logToConsole(logData);
      }
      
      // If in production, also log to Supabase
      if (process.env.NODE_ENV === 'production') {
        try {
          await this.logToSupabase(logData);
        } catch (error) {
          // Fallback to console in case Supabase logging fails
          console.error('Failed to log to Supabase:', error);
          this.logToConsole(logData);
        }
      }
    }
    
    private logToConsole(logData: LogData): void {
      const { level, message, context, userId, timestamp } = logData;
      const logMessage = `[${timestamp}][${level}]${userId ? `[User: ${userId}]` : ''}: ${message}`;
      
      switch (level) {
        case LogLevel.INFO:
          console.info(logMessage, context || '');
          break;
        case LogLevel.WARN:
          console.warn(logMessage, context || '');
          break;
        case LogLevel.ERROR:
          console.error(logMessage, context || '');
          break;
      }
    }
    
    private async logToSupabase(logData: LogData): Promise<void> {
      const { supabase } = await import('@/lib/supabase');
      
      const { error } = await supabase
        .from(this.supabaseTable)
        .insert([logData]);
        
      if (error) {
        console.error('Error sending log to Supabase:', error);
      }
    }
    
    info(message: string, context?: Record<string, unknown>, userId?: string): void {
      this.log(LogLevel.INFO, message, context, userId);
    }
    
    warn(message: string, context?: Record<string, unknown>, userId?: string): void {
      this.log(LogLevel.WARN, message, context, userId);
    }
    
    error(message: string, context?: Record<string, unknown>, userId?: string): void {
      this.log(LogLevel.ERROR, message, context, userId);
    }
  }
  
  export const logger = Logger.getInstance();