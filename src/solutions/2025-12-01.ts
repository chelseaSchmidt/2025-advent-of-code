import fs from 'fs';
import path from 'path';

type NonEmpty<T> = [T, ...T[]];
type Direction = 'R' | 'L';
type Rotation = [Direction, number];
type Position = number;
type Password = number;

const START_POSITION = 50;

export function part1Day01(): void {
  console.log(
    solvePart1(
      parse(path.resolve(__dirname, '..', 'inputs', '2025-12-01.txt')),
    ),
  );
}

function solvePart1(rotations: Rotation[]): Password {
  return rotations
    .reduce<NonEmpty<Position>>(rotateDial, [START_POSITION])
    .filter(isZero).length;
}

function parse(filePath: string): Rotation[] {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map<Rotation>((line) => {
      const [direction] = line;
      if (direction === 'L' || direction === 'R') {
        return [direction, Number(line.substring(1))];
      } else {
        throw new Error('Invalid input');
      }
    });
}

function rotateDial(
  accum: NonEmpty<Position>,
  rotation: Rotation,
): NonEmpty<Position> {
  const [start] = accum;
  const [direction, distance] = rotation;
  return [nextPosition(start, distance, direction), ...accum];
}

function nextPosition(
  start: Position,
  distance: number,
  direction: Direction,
): Position {
  const clickCount = start + (direction === 'R' ? distance : -distance);
  return direction === 'R' ? adjustRight(clickCount) : adjustLeft(clickCount);
}

function adjustRight(position: Position): Position {
  return position > 99 ? adjustRight(position - 100) : position;
}

function adjustLeft(position: Position): Position {
  return position < 0 ? adjustLeft(position + 100) : position;
}

function isZero(num: Number): num is 0 {
  return !num;
}
