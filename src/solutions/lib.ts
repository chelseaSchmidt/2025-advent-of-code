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
