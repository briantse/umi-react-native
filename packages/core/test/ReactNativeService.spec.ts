import { ReactNativeService } from '../src';

describe('ReactNativeService', () => {
  it('should work', function () {
    const service = new ReactNativeService({
      cwd: process.cwd(),
    });
    expect(service).not.toBeNull();
  });
});