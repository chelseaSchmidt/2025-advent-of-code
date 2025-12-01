import fs from 'fs';

type NonEmpty<T> = [T, ...T[]];
type Direction = 'R' | 'L';
type Rotation = [Direction, number];
type Position = number;
type Password = number;

const START_POSITION = 50;

export function day01(inputPath: string): [Password, Password] {
  const input = parse(inputPath);
  return [solvePart1(input), solvePart2(input)];
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

function solvePart1(rotations: Rotation[]): Password {
  return rotations
    .reduce<NonEmpty<Position>>(rotateDial, [START_POSITION])
    .filter(isZero).length;
}

function solvePart2(rotations: Rotation[]): Password {
  return 0; // TODO
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

function isZero(num: number): num is 0 {
  return !isNaN(num) && !num;
}
