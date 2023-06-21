import { Matrix } from "react-spreadsheet";
import Item from "../types/Item.types";
import StatisticType from "../enums/StatisticType.enums";
import { SETTINGS_KEY, STATISTIC_HEADERS } from "../constants";

const findNonNullIndexFromEndToStart = (array: Array<Item | undefined>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i]) return i;
  }
  return -1;
};

const getLongestColumnWithValue = (
  matrix: Matrix<Item | undefined>,
  value: string
) => {
  let longestColumn = 0;

  for (let col = 0; col < matrix[0].length; col++) {
    let columnLength = 0;

    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col]?.value.toUpperCase() === value.toUpperCase()) {
        columnLength++;
      }

      if (columnLength > longestColumn) {
        longestColumn = columnLength;
      }
    }
  }

  return longestColumn;
};

const getLatestColumnSize = (matrix: Matrix<Item | undefined>) => {
  const colIdx = findNonNullIndexFromEndToStart(matrix[0]);
  if (colIdx < 0) return 0;
  const value = matrix[0][colIdx]?.value;
  let latestColumnSize = 0;
  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
    if (matrix[rowIdx][colIdx]?.value.toUpperCase() === value?.toUpperCase()) {
      latestColumnSize++;
    } else {
      break;
    }
  }
  return latestColumnSize;
};

const getTotalAdjacentGroupColumns = (matrix: Matrix<Item | undefined>) => {
  const numRows = 2; // we only need to check the first 2 rows
  const numCols = matrix[0].length;
  let count = 0;

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const cellValue = matrix[row][col]?.value.toUpperCase();
      const adjacentCellValue =
        matrix[row][col + 1]?.value.toUpperCase() || null;
      if (cellValue && !adjacentCellValue) {
        if (row === numRows - 1) count++;
      }
    }
  }

  return count;
};

const getTotalParallelWithValue = (
  matrix: Matrix<Item | undefined>,
  value: string
) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  for (let col = 0; col < cols; col++) {
    let valueCount = 0;

    for (let row = 0; row < rows; row++) {
      if (matrix[row][col]?.value.toUpperCase() === value.toUpperCase()) {
        valueCount++;
      }
    }

    if (valueCount >= 2) {
      count++;
    }
  }

  return count;
};

const getStatistic = (matrix: Matrix<Item | undefined>) => {
  const result: Record<StatisticType, number> = {
    [StatisticType.LongestA]: getLongestColumnWithValue(matrix, "A"),
    [StatisticType.LongestB]: getLongestColumnWithValue(matrix, "B"),
    [StatisticType.LongestC]: getLongestColumnWithValue(matrix, "C"),
    [StatisticType.CurrentColumnSize]: getLatestColumnSize(matrix),
    [StatisticType.ParallelA]: getTotalParallelWithValue(matrix, "A"),
    [StatisticType.ParallelB]: getTotalParallelWithValue(matrix, "B"),
    [StatisticType.ParallelC]: getTotalParallelWithValue(matrix, "C"),
    [StatisticType.TotalGroup]: getTotalAdjacentGroupColumns(matrix),
  };

  return STATISTIC_HEADERS.map((data) => ({
    ...data,
    value: result[data.type],
  }));
};

const getSettings = () => {
  const settings = localStorage.getItem(SETTINGS_KEY);
  return settings ? JSON.parse(settings) : null;
};

export { findNonNullIndexFromEndToStart, getStatistic, getSettings };
