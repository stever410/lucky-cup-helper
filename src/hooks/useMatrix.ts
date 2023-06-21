import { useEffect, useState } from "react";
import { Matrix } from "react-spreadsheet";
import { INITIAL_VALUE, MATRIX_KEY } from "../constants";
import Item from "../types/Item.types";
import { getSettings, getStatistic } from "../utils";
import useSound from "./useSound";
import StatisticType from "../enums/StatisticType.enums";

const useMatrix = (initialMatrix: Matrix<Item | undefined>) => {
  const [matrix, setMatrix] = useState<Matrix<Item | undefined>>(initialMatrix);
  const [statistic, setStatistic] = useState(getStatistic(matrix));
  const { playSuccessSound } = useSound();

  useEffect(() => {
    const savedMatrix = localStorage.getItem(MATRIX_KEY);
    if (savedMatrix) {
      const tmpMatrix = JSON.parse(savedMatrix);
      setMatrix(tmpMatrix);
      setStatistic(getStatistic(tmpMatrix));
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
    setStatistic(getStatistic(INITIAL_VALUE));
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
    const notifyList: Record<StatisticType, boolean> = {
      [StatisticType.LongestA]: false,
      [StatisticType.LongestB]: false,
      [StatisticType.LongestC]: false,
      [StatisticType.CurrentColumnSize]: false,
      [StatisticType.ParallelA]: false,
      [StatisticType.ParallelB]: false,
      [StatisticType.ParallelC]: false,
      [StatisticType.TotalGroup]: false,
    };

    if (settings) {
      let shouldPlaySound = false;
      tmpStatistic.forEach(({ type, threshold, value }) => {
        const thresholdValue = settings[threshold];
        if (value === thresholdValue) {
          notifyList[type] = true;
          shouldPlaySound = true;
        }
      });
      if (shouldPlaySound) playSuccessSound();
    }

    setMatrix(tmpMatrix);
    setStatistic(
      tmpStatistic.map((data) => ({
        ...data,
        isThresholdReach: notifyList[data.type],
      }))
    );
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
