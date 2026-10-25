import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { timingSafeEqual } from 'node:crypto';

type ExecutionRequest = {
  headers?: Record<string, string | string[] | undefined>;
};

@Injectable()
export class ExecutionAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expectedKey = process.env.KVR_EXECUTION_API_KEY;

    // Fail closed unless a sufficiently strong server-side key is configured.
    if (!expectedKey || expectedKey.trim() !== expectedKey) {
      return false;
    }

    const expected = Buffer.from(expectedKey, 'utf8');
    if (expected.length < 32) {
      return false;
    }

    const request = context.switchToHttp().getRequest<ExecutionRequest>();
    const providedKey = request.headers?.['x-kvr-execution-key'];

    if (typeof providedKey !== 'string') {
      return false;
    }

    const provided = Buffer.from(providedKey, 'utf8');
    if (provided.length !== expected.length) {
      return false;
    }

    return timingSafeEqual(expected, provided);
  }
}

/**
 * Protects privileged core operations with a server-configured execution key.
 * The guard is stateless and has no dependencies, so the decorator can safely
 * carry an instance without requiring per-module provider registration.
 */
export const RequireExecutionKey = () => UseGuards(new ExecutionAccessGuard());
