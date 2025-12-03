export function sum(nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
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
