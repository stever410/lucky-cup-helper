import { useEffect, useState } from "react";
import { Matrix } from "react-spreadsheet";

const LOCAL_STORAGE_KEY = "matrix";
const DEFAULT_SIZE = 10;
const INITIAL_VALUE = [...new Array(DEFAULT_SIZE)].map(
  () => new Array(DEFAULT_SIZE)
);

const useMatrix = () => {
  const [matrix, setMatrix] = useState<Matrix<Item | undefined>>(INITIAL_VALUE);

  useEffect(() => {
    const savedMatrix = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMatrix) {
      setMatrix(JSON.parse(savedMatrix));
    }
  }, []);

  const getStatistic = () => {
    return {
      longestA: getLongestColumnWithValue("A"),
      longestB: getLongestColumnWithValue("B"),
      longestC: getLongestColumnWithValue("C"),
      mostParallel: 0,
      mostGroup: 0,
    };
  };

  const getLongestColumnWithValue = (value: string) => {
    let maxLength = 0;
    for (let i = 0; i < matrix.length; i++) {
      let j = 0;
      if (matrix[j] && matrix[j][i]?.value === value) {
        let currentLength = 1;
        while (j < matrix.length) {
          ++j;
          if (matrix[j][i]?.value === value) currentLength++;
          else break;
        }
        if (currentLength > maxLength) maxLength = currentLength;
      }
    }
    return maxLength;
  };

  const addRow = () => {
    setMatrix([...matrix, new Array(matrix.length)]);
  };

  const addColumn = () => {
    const tempMatrix = [...matrix];
    tempMatrix.forEach((row) => row.push(undefined));
    setMatrix(tempMatrix);
  };

  const removeLastRow = () => {
    const tempMatrix = [...matrix];
    tempMatrix.pop();
    setMatrix(tempMatrix);
  };

  const removeLastColumn = () => {
    const tempMatrix = [...matrix];
    tempMatrix.forEach((row) => row.pop());
    setMatrix(tempMatrix);
  };

  const clearMatrix = () => {
    setMatrix(INITIAL_VALUE);
  };

  const saveMatrixToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(matrix));
  };

  const handleChange = (data: Matrix<Item | undefined>) => {
    setMatrix(data);
  };

  return {
    matrix,
    addRow,
    addColumn,
    removeLastColumn,
    removeLastRow,
    handleChange,
    getStatistic,
    clearMatrix,
    saveMatrixToLocalStorage,
  };
};

export default useMatrix;
