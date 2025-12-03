import fs from 'fs';

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
  return sum(ranges.map(sequence).flatMap(detectRepeats));
}

function sequence([start, end]: Range): number[] {
  const nums = [start];
  let last = nums.at(-1);

  while (last !== undefined && last < end) {
    const next = last + 1;
    nums.push(next);
    last = next;
  }

  return nums;
}

function detectRepeats(): number[] {
  return []; // TODO
}

function sum(nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}

/**
 * No nice things for me
 */

// return (function generate(
//   nums: NonEmpty<number>,
//   end: number,
// ): NonEmpty<number> {
//   const last = nums.at(-1)!;
//   if (last < end) {
//     nums.push(last + 1);
//   } else {
//     return nums;
//   }
//   return generate(nums, end);
// })([start], end);
