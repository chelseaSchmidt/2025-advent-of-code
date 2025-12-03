import fs from 'fs';

type NonEmpty<T> = [T, ...T[]];
type Direction = 'R' | 'L';
type Rotation = [Direction, number];
type Position = number;
type OriginHits = number;
type Password = number;
type RotationSummary = {
  positions: NonEmpty<Position>;
  originHits: OriginHits;
};

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
    .reduce<RotationSummary>(rotateDial, {
      positions: [START_POSITION],
      originHits: 0,
    })
    .positions.filter(isZero).length;
}

function solvePart2(rotations: Rotation[]): Password {
  return rotations.reduce<RotationSummary>(rotateDial, {
    positions: [START_POSITION],
    originHits: 0,
  }).originHits;
}

function rotateDial(
  accum: RotationSummary,
  rotation: Rotation,
): RotationSummary {
  const [start] = accum.positions;
  const [direction, distance] = rotation;

  return {
    positions: [nextPosition(start, distance, direction), ...accum.positions],
    originHits: countOriginHits(start, distance, direction, accum.originHits),
  };
}

function countOriginHits(
  start: Position,
  distance: number,
  direction: Direction,
  prev: OriginHits,
): OriginHits {
  let count = prev;

  const clicksToZero = direction === 'R' ? 100 - start : start;

  if (distance >= clicksToZero) {
    count += clicksToZero > 0 ? 1 : 0; // consume distance to origin
    count += Math.floor((distance - clicksToZero) / 100); // additional hits after starting from origin
  }

  return count;
}

function nextPosition(
  start: Position,
  distance: number,
  direction: Direction,
): Position {
  const rawPosition = start + (direction === 'R' ? distance : -distance);
  return direction === 'R' ? adjustRight(rawPosition) : adjustLeft(rawPosition);
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
