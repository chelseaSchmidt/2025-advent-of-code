import fs from 'fs';
import {
  chunk,
  enumerateRange,
  findIndices,
  joinChars,
  sum,
  toChars,
} from './lib';
import { Range } from './types';

type Sum = number;

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
    ranges.map(enumerateRange).flatMap((r) => detectRepeats(r, { max: 1 })),
  );
}

function solvePart2(ranges: Range[]): Sum {
  return sum(ranges.map(enumerateRange).flatMap((r) => detectRepeats(r)));
}

function detectRepeats(ids: number[], { max = Infinity } = {}): number[] {
  return [
    ...new Set(
      ids
        .map(String)
        .map(toChars)
        .filter((digits) =>
          findIndices(digits, digits[0], 1).some((i) => {
            const firstSeq = joinChars(digits.slice(0, i));
            const theRest = digits.slice(firstSeq.length);
            const subSequences = chunk(theRest, firstSeq.length).map(joinChars);
            return (
              subSequences.length <= max &&
              subSequences.every((subSeq) => subSeq === firstSeq)
            );
          }),
        )
        .map(joinChars)
        .map(Number),
    ),
  ];
}
