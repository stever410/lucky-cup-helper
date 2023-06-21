import StatisticType from "../enums/StatisticType.enums";

type Statistic = {
  type: StatisticType;
  title: string;
  value: number;
};

export default Statistic;
