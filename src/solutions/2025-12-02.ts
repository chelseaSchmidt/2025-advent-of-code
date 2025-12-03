import fs from 'fs';
import { chunk, findIndices, sum } from './lib';

type Sum = number;
type Range = [number, number];

export function day02(inputPath: string): [Sum, Sum] {
  const input = parse(inputPath);
  return [solvePart1(input), solvePart2(input)];
}

function parse(filePath: string): Range[] {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split(',')
    .map<Range>((str) => {
      const [start, end] = str.split('-');
      if (start !== undefined && end !== undefined) {
        return [Number(start), Number(end)];
      }
      throw new Error('Invalid input');
    });
}

function solvePart1(ranges: Range[]): Sum {
  return sum(
    ranges
      .map(expandRange)
      .flatMap((r) => detectRepeatedSequences(r, { max: 1 })),
  );
}

function solvePart2(ranges: Range[]): Sum {
  return sum(
    ranges.map(expandRange).flatMap((r) => detectRepeatedSequences(r)),
  );
}

function expandRange([start, end]: Range): number[] {
  const nums = [start];
  let last = nums.at(-1);

  while (last !== undefined && last < end) {
    const next = last + 1;
    nums.push(next);
    last = next;
  }

  return nums;
}

function detectRepeatedSequences(
  ids: number[],
  { max = Infinity } = {},
): number[] {
  return [
    ...new Set(
      ids
        .map(String)
        .map((id) => id.split(''))
        .filter((digits) =>
          findIndices(digits, digits[0], 1).some((i) => {
            const sequence = digits.slice(0, i).join('');
            const chunks = chunk(digits, sequence.length).map((ch) =>
              ch.join(''),
            );
            return (
              chunks.length - 1 <= max && chunks.every((ch) => ch === sequence)
            );
          }),
        )
        .map((digits) => digits.join('')),
    ),
  ].map(Number);
}
