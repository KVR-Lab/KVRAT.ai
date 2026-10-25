import { ExecutionContext } from '@nestjs/common';
import { ExecutionAccessGuard } from './execution-access.guard';

function mockContext(header?: string | string[]): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          'x-kvr-execution-key': header,
        },
      }),
    }),
  } as unknown as ExecutionContext;
}

describe('ExecutionAccessGuard', () => {
  const originalKey = process.env.KVR_EXECUTION_API_KEY;
  const guard = new ExecutionAccessGuard();
  const validKey = 'kvr-foundation-test-key-000000000000';

  beforeEach(() => {
    delete process.env.KVR_EXECUTION_API_KEY;
  });

  afterAll(() => {
    if (originalKey === undefined) {
      delete process.env.KVR_EXECUTION_API_KEY;
    } else {
      process.env.KVR_EXECUTION_API_KEY = originalKey;
    }
  });

  it('denies access when the server key is not configured', () => {
    expect(guard.canActivate(mockContext(validKey))).toBe(false);
  });

  it('denies a configured key shorter than 32 bytes', () => {
    process.env.KVR_EXECUTION_API_KEY = 'short-key';
    expect(guard.canActivate(mockContext('short-key'))).toBe(false);
  });

  it('denies access when the header is missing or not a single string', () => {
    process.env.KVR_EXECUTION_API_KEY = validKey;
    expect(guard.canActivate(mockContext())).toBe(false);
    expect(guard.canActivate(mockContext([validKey, validKey]))).toBe(false);
  });

  it('denies a mismatched key of the same length', () => {
    process.env.KVR_EXECUTION_API_KEY = validKey;
    expect(guard.canActivate(mockContext('x'.repeat(validKey.length)))).toBe(false);
  });

  it('allows a matching configured key', () => {
    process.env.KVR_EXECUTION_API_KEY = validKey;
    expect(guard.canActivate(mockContext(validKey))).toBe(true);
  });
});
