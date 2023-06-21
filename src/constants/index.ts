import StatisticType from "../enums/StatisticType.enums";
import Threshold from "../enums/Threshold.enums";
import Statistic from "../types/Statistic.types";

export const MATRIX_KEY = "matrix";
export const SETTINGS_KEY = "settings";
export const DEFAULT_SIZE = 10;
export const INITIAL_VALUE = [...new Array(DEFAULT_SIZE)].map(
  () => new Array(DEFAULT_SIZE)
);
export const STATISTIC_HEADERS: Array<Statistic> = [
  {
    type: StatisticType.LongestA,
    title: "A dài nhất",
    value: 0,
    threshold: Threshold.Longest,
  },
  {
    type: StatisticType.LongestB,
    title: "B dài nhất",
    value: 0,
    threshold: Threshold.Longest,
  },
  {
    type: StatisticType.LongestC,
    title: "C dài nhất",
    value: 0,
    threshold: Threshold.Longest,
  },
  {
    type: StatisticType.CurrentColumnSize,
    title: "Kéo dây",
    value: 0,
    threshold: Threshold.LongestLatest,
  },
  {
    type: StatisticType.ParallelA,
    title: "Dây song song A",
    value: 0,
    threshold: Threshold.Parallel,
  },
  {
    type: StatisticType.ParallelB,
    title: "Dây song song B",
    value: 0,
    threshold: Threshold.Parallel,
  },
  {
    type: StatisticType.ParallelC,
    title: "Dây song song C",
    value: 0,
    threshold: Threshold.Parallel,
  },
  {
    type: StatisticType.TotalGroup,
    title: "Dây chùm",
    value: 0,
    threshold: Threshold.Group,
  },
];
