import path from 'path';
import { day01 } from './solutions/2025-12-01';
import { day02 } from './solutions/2025-12-02';

main();

export default function main() {
  console.log(
    day01(dayToInput(1)), // [1018, 5815]
    day02(dayToInput(2)),
  );
}

function dayToInput(day: number): string {
  return path.resolve(
    __dirname,
    'inputs',
    `2025-12-${String(day).padStart(2, '0')}.txt`,
  );
}
