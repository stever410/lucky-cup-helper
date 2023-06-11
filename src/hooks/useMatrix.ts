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
    clearMatrix,
    saveMatrixToLocalStorage,
  };
};

export default useMatrix;
