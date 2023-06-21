import { useEffect, useState } from "react";
import { Matrix } from "react-spreadsheet";
import { INITIAL_VALUE, MATRIX_KEY } from "../constants";
import Item from "../types/Item.types";
import { getSettings, getStatistic } from "../utils";
import useSound from "./useSound";

const useMatrix = (initialMatrix: Matrix<Item | undefined>) => {
  const [matrix, setMatrix] = useState<Matrix<Item | undefined>>(initialMatrix);
  const [statistic, setStatistic] = useState(getStatistic(matrix));
  const { playSuccessSound } = useSound();

  useEffect(() => {
    const savedMatrix = localStorage.getItem(MATRIX_KEY);
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
    const tempMatrix = [...matrix].slice(0, -1);
    setMatrix(tempMatrix);
  };

  const removeLastColumn = () => {
    const tempMatrix = [...matrix].map((row) => row.slice(0, -1));
    setMatrix(tempMatrix);
  };

  const clearMatrix = () => {
    setMatrix(INITIAL_VALUE);
  };

  const saveMatrixToLocalStorage = () => {
    localStorage.setItem(MATRIX_KEY, JSON.stringify(matrix));
  };

  const handleChange = (data: Matrix<Item | undefined>) => {
    const tmpMatrix = data.map((row) => {
      return row.map((item) => {
        if (!item?.value || item?.value.length === 0) item = undefined;
        return item;
      });
    });
    const tmpStatistic = getStatistic(tmpMatrix);
    const settings = getSettings();

    setStatistic(tmpStatistic);
    setMatrix(tmpMatrix);

    if (settings) {
      const shouldPlaySound = tmpStatistic.some(({ threshold, value }) => {
        const thresholdValue = settings[threshold];
        if (value === thresholdValue) return true;
        return false;
      });
      if (shouldPlaySound) playSuccessSound();
    }
  };

  return {
    matrix,
    statistic,
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
