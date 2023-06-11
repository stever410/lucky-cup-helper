import { useEffect, useState } from "react";
import { Matrix } from "react-spreadsheet";
import { findNonNullIndexFromEndToStart } from "../utils";

const STATISTIC_HEADERS: Array<Statistic> = [
  {
    id: "longestA",
    title: "A dài nhất",
    value: 0,
  },
  {
    id: "longestB",
    title: "B dài nhất",
    value: 0,
  },
  {
    id: "longestC",
    title: "C dài nhất",
    value: 0,
  },
  {
    id: "currentColumnSize",
    title: "Kéo dây",
    value: 0,
  },
  {
    id: "mostParallel",
    title: "Dây song song",
    value: 0,
  },
  {
    id: "mostGroup",
    title: "Dây chùm",
    value: 0,
  },
];

const useStatistic = (matrix: Matrix<Item | undefined>) => {
  const [statistic, setStatistic] = useState(STATISTIC_HEADERS);

  useEffect(() => {
    const result = {
      longestA: getLongestColumnWithValue("A"),
      longestB: getLongestColumnWithValue("B"),
      longestC: getLongestColumnWithValue("C"),
      currentColumnSize: getLatestColumnSize(),
      mostParallel: 0,
      mostGroup: 0,
    };

    setStatistic(
      statistic.map((data) => ({ ...data, value: result[data.id] }))
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

  return statistic;
};

export default useStatistic;
