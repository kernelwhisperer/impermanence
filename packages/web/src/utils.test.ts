import { expect, test, vi } from "vitest";

import { msUntilNextInterval } from "./utils";

test("msUntilNextInterval should return 1ms at 13:59:99.999", () => {
  // arrange
  vi.useFakeTimers();
  // act
  vi.setSystemTime(new Date(2000, 0, 1, 16, 0, 0, -1));
  // assert
  expect(msUntilNextInterval()).equal(1);
  // cleanup
  vi.useRealTimers();
});

test("msUntilNextInterval should return 2.5m at 16:12:30.000", () => {
  // arrange
  vi.useFakeTimers();
  // act
  vi.setSystemTime(new Date(2000, 0, 1, 16, 12, 30, 0));
  // assert
  expect(msUntilNextInterval()).equal(2.5 * 60 * 1000);
  // cleanup
  vi.useRealTimers();
});

test("msUntilNextInterval should return 14.9m at 16:00:00.001", () => {
  // arrange
  vi.useFakeTimers();
  // act
  vi.setSystemTime(new Date(2000, 0, 1, 16, 0, 0, 1));
  // assert
  expect(msUntilNextInterval()).equal(15 * 60 * 1000 - 1);
  // cleanup
  vi.useRealTimers();
});

test("msUntilNextInterval should return 15m at 16:00:00.000", () => {
  // arrange
  vi.useFakeTimers();
  // act
  vi.setSystemTime(new Date(2000, 0, 1, 16, 0, 0, 0));
  // assert
  expect(msUntilNextInterval()).equal(15 * 60 * 1000);
  // cleanup
  vi.useRealTimers();
});

test("msUntilNextInterval should return 10m at 16:50:00.000", () => {
  // arrange
  vi.useFakeTimers();
  // act
  vi.setSystemTime(new Date(2000, 0, 1, 16, 50, 0, 0));
  // assert
  expect(msUntilNextInterval()).equal(10 * 60 * 1000);
  // cleanup
  vi.useRealTimers();
});
