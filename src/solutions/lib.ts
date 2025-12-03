import { Range } from './types';

export function sum(nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}

export function enumerateRange([start, end]: Range): number[] {
  const nums = [start];
  let last = nums.at(-1);

  while (last !== undefined && last < end) {
    const next = last + 1;
    nums.push(next);
    last = next;
  }

  return nums;
}

export function findIndices<T>(
  arr: T[],
  value: T,
  startFrom: number,
): number[] {
  return arr.reduce<number[]>((accum, num, i) => {
    if (num === value && i >= startFrom) accum.push(i);
    return accum;
  }, []);
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const copy = arr.slice();
  const result: T[][] = [];
  let currentChunk: T[] = [];

  while (copy.length) {
    currentChunk.push(copy.pop()!);

    if (currentChunk.length === size || !copy.length) {
      result.push(currentChunk.slice().reverse());
      currentChunk = [];
    }
  }

  return result;
}

export function toChars(str: string): string[] {
  return str.split('');
}

export function joinChars(chars: string[]): string {
  return chars.join('');
}
