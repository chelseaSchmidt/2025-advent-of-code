import fs from 'fs';
import { count, toChars } from './lib';

const ROLL = 1;
const EMPTY = 0;
const MARKED = 2;

type Location = typeof ROLL | typeof EMPTY;
type Grid = Location[][];
type MarkedGrid = (Location | typeof MARKED)[][];

export function day04(inputPath: string): [number, number] {
  const input = parse(inputPath);
  return [countRolls(input, { once: true }), countRolls(input)];
}

function parse(filePath: string): Grid {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map<Location[]>((str) =>
      toChars(str).map((char) => (char === '@' ? ROLL : EMPTY)),
    );
}

function countRolls(grid: Grid, { once = false } = {}): number {
  const markedGrid = markRolls(grid);
  const rolls = count(markedGrid.flatMap((r) => r.filter((c) => c === MARKED)));
  return rolls + (rolls > 0 && !once ? countRolls(removeRolls(markedGrid)) : 0);
}

function markRolls(grid: Grid): MarkedGrid {
  return grid.map((row, rowIdx) =>
    row
      .map((roll, colIdx) =>
        roll ? countAdjacents(grid, row, rowIdx, colIdx) : -1,
      )
      .map((adjacentCount) =>
        adjacentCount >= 0 && adjacentCount < 4
          ? MARKED
          : adjacentCount < 0
          ? EMPTY
          : ROLL,
      ),
  );
}

function removeRolls(markedGrid: MarkedGrid): Grid {
  return markedGrid.map((r) => r.map((c) => (c === MARKED ? EMPTY : c)));
}

function countAdjacents(
  grid: Grid,
  row: Location[],
  rowIdx: number,
  colIdx: number,
) {
  return count([
    row[colIdx - 1],
    row[colIdx + 1],
    grid[rowIdx - 1]?.[colIdx],
    grid[rowIdx + 1]?.[colIdx],
    grid[rowIdx - 1]?.[colIdx - 1],
    grid[rowIdx - 1]?.[colIdx + 1],
    grid[rowIdx + 1]?.[colIdx - 1],
    grid[rowIdx + 1]?.[colIdx + 1],
  ]);
}
