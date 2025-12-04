import fs from 'fs';
import { sum, toChars } from './lib';
import { NonEmpty } from './types';

const BATTERIES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type Battery = (typeof BATTERIES)[number];
type Bank = NonEmpty<Battery>;
type Joltage = number;
type BatteryData = { value: Battery; index: number };

export function day03(inputPath: string): [Joltage, Joltage] {
  const input = parse(inputPath);
  return [
    solvePart1(input),
    0, // TODO
  ];
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

function solvePart1(banks: Bank[]): Joltage {
  return sum(
    banks.map((bank) => {
      const { value: firstBattery, index } = getBatteryData(bank, -1);
      const { value: secondBattery } = getBatteryData(
        bank.slice(index + 1) as Bank, // 🤮
      );
      return Number(`${firstBattery}${secondBattery}`);
    }),
  );
}

function getBatteryData(bank: Bank, end?: number): BatteryData {
  return bank
    .slice(0, end)
    .reduce<BatteryData>(
      (prev, value, index) => (value > prev.value ? { value, index } : prev),
      { value: bank[0], index: 0 },
    );
}

function isBattery(value: number): value is Battery {
  return BATTERIES.map(Number).includes(value);
}
