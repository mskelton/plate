import { pipe } from '@udecode/slate-plugins-core';

const input = 1;

const output = 2;

it('should be', () => {
  expect(pipe(input, (x) => x + 1)).toEqual(output);
});
