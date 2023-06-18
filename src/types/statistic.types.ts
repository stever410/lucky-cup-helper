import { StatisticType } from "../enums/StatisticType.enums";

export type Statistic = {
  type: StatisticType;
  title: string;
  value: number;
};
