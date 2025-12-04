import fs from 'fs';
import { joinChars, sum, toChars } from './lib';
import { NonEmpty } from './types';

const BATTERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type Battery = (typeof BATTERIES)[number];
type Bank = NonEmpty<Battery>;
type Joltage = number;
type BatteryData = { value: Battery; i: number };

export function day03(inputPath: string): [Joltage, Joltage] {
  const input = parse(inputPath);
  return [solve(input, 2), solve(input, 12)];
}

function parse(filePath: string): Bank[] {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map<Bank>((str) => {
      const result = toChars(str).map(Number);
      if (result[0] && result.every(isBattery)) {
        return [result[0], ...result.slice(1)];
      }
      throw new Error('Invalid input');
    });
}

function solve(banks: Bank[], batteryCount: number): Joltage {
  return sum(
    banks.map((bank) =>
      Number(
        joinChars(
          getBatteriesData(bank, batteryCount).map(({ value }) =>
            String(value),
          ),
        ),
      ),
    ),
  );
}

function getBatteriesData(
  bank: Bank,
  countNeeded: number,
  selected: BatteryData[] = [],
): BatteryData[] {
  if (!countNeeded) return selected;

  const nextBattery = bank
    .slice(0, -(countNeeded - 1) || undefined)
    .reduce<BatteryData>(
      (prev, value, i) => (value > prev.value ? { value, i } : prev),
      { value: bank[0], i: 0 },
    );

  return getBatteriesData(
    bank.slice(nextBattery.i + 1) as Bank, // 🤮,
    countNeeded - 1,
    [...selected, nextBattery],
  );
}

function isBattery(value: number): value is Battery {
  return BATTERIES.map(Number).includes(value);
}
