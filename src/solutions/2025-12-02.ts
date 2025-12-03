import fs from 'fs';
import { findIndices, sum } from './lib';

type Sum = number;
type Range = [number, number];

export function day02(inputPath: string): [Sum /*, Sum*/] {
  const input = parse(inputPath);

  return [
    solvePart1(input),
    // solvePart2(input),
  ];
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
  return sum(ranges.map(expandRange).flatMap(detectSingleRepeatedSequence));
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

function detectSingleRepeatedSequence(ids: number[]): number[] {
  return [
    ...new Set(
      ids
        .map(String)
        .map((id) => id.split(''))
        .filter((digits) =>
          findIndices(digits, digits[0], 1).some(
            (i) => digits.slice(0, i).join('') === digits.slice(i).join(''),
          ),
        )
        .map((digits) => digits.join('')),
    ),
  ].map(Number);
}
