import { useEffect, useState } from "react";
import { Matrix } from "react-spreadsheet";
import { findNonNullIndexFromEndToStart } from "../utils";
import { Item } from "../types/Item.types";
import { Statistic } from "../types/Statistic.types";
import { StatisticType } from "../enums/StatisticType.enums";

const STATISTIC_HEADERS: Array<Statistic> = [
  {
    type: StatisticType.LongestA,
    title: "A dài nhất",
    value: 0,
  },
  {
    type: StatisticType.LongestB,
    title: "B dài nhất",
    value: 0,
  },
  {
    type: StatisticType.LongestC,
    title: "C dài nhất",
    value: 0,
  },
  {
    type: StatisticType.CurrentColumnSize,
    title: "Kéo dây",
    value: 0,
  },
  {
    type: StatisticType.TotalParallel,
    title: "Dây song song",
    value: 0,
  },
  {
    type: StatisticType.TotalGroup,
    title: "Dây chùm",
    value: 0,
  },
];

const useStatistic = (matrix: Matrix<Item | undefined>) => {
  const [statistic, setStatistic] = useState(STATISTIC_HEADERS);

  useEffect(() => {
    const result = {
      [StatisticType.LongestA]: getLongestColumnWithValue("A"),
      [StatisticType.LongestB]: getLongestColumnWithValue("B"),
      [StatisticType.LongestC]: getLongestColumnWithValue("C"),
      [StatisticType.CurrentColumnSize]: getLatestColumnSize(),
      [StatisticType.TotalParallel]: getTotalParallel(),
      [StatisticType.TotalGroup]: getTotalAdjacentGroupColumns(),
    };

    setStatistic(
      statistic.map((data) => ({ ...data, value: result[data.type] }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matrix]);

  const getLongestColumnWithValue = (value: string) => {
    let maxLength = 0;
    for (let colIdx = 0; colIdx < matrix.length; colIdx++) {
      let rowIdx = 0;
      if (matrix[rowIdx] && matrix[rowIdx][colIdx]?.value === value) {
        let currentLength = 1;
        while (rowIdx < matrix.length) {
          ++rowIdx;
          if (matrix[rowIdx][colIdx]?.value === value) currentLength++;
          else break;
        }
        if (currentLength > maxLength) maxLength = currentLength;
      }
    }
    return maxLength;
  };

  const getLatestColumnSize = () => {
    const colIdx = findNonNullIndexFromEndToStart(matrix[0]);
    if (colIdx < 0) return 0;
    const value = matrix[0][colIdx]?.value;
    let latestColumnSize = 0;
    for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
      if (matrix[rowIdx][colIdx]?.value === value) {
        latestColumnSize++;
      } else {
        break;
      }
    }
    return latestColumnSize;
  };

  const getTotalAdjacentGroupColumns = () => {
    const numRows = 2; // we only need to check the first 2 rows
    const numCols = matrix[0].length;
    let count = 0;

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        const cellValue = matrix[row][col];
        const adjacentCellValue = matrix[row][col + 1] || null;
        if (cellValue && !adjacentCellValue) {
          if (row === numRows - 1) count++;
        }
      }
    }

    return count;
  };

  const getTotalParallel = () => {
    return 0;
  };

  return statistic;
};

export default useStatistic;
