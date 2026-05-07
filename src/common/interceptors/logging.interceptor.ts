import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req =
      context.getType<'http' | 'graphql'>() === 'graphql'
        ? GqlExecutionContext.create(context).getContext()?.req
        : context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const className = context.getClass();
    const method = req?.method ?? 'GRAPHQL';
    const url = req?.url ?? '/graphql';

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`[${className.name}.${handler.name}] - Handler executed`);
        const ms = Date.now() - start;
        console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
      }),
    );
  }
}
