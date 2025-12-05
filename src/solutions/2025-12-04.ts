import fs from 'fs';
import { sum, toChars } from './lib';

type RollLocation = 1 | 0;
type Grid = RollLocation[][];

export function day04(inputPath: string): [number, number] {
  const input = parse(inputPath);
  return [solve(input), 0];
}

function parse(filePath: string): Grid {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map<RollLocation[]>((str) =>
      toChars(str).map((char) => (char === '@' ? 1 : 0)),
    );
}

function solve(grid: Grid): number {
  return sum(
    grid.flatMap((row, rowIdx) =>
      row
        .map((cell, colIdx) =>
          cell
            ? sum(
                [
                  row[colIdx - 1],
                  row[colIdx + 1],
                  grid[rowIdx - 1]?.[colIdx],
                  grid[rowIdx + 1]?.[colIdx],
                  grid[rowIdx - 1]?.[colIdx - 1],
                  grid[rowIdx - 1]?.[colIdx + 1],
                  grid[rowIdx + 1]?.[colIdx - 1],
                  grid[rowIdx + 1]?.[colIdx + 1],
                ].map((adjacent) => adjacent || 0),
              )
            : -1,
        )
        .filter((adjacentCount) => adjacentCount >= 0 && adjacentCount < 4)
        .map(() => 1),
    ),
  );
}
