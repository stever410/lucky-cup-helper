import StatisticType from "../enums/StatisticType.enums";
import Threshold from "../enums/Threshold.enums";

type Statistic = {
  type: StatisticType;
  threshold: Threshold;
  title: string;
  value: number;
  isThresholdReach?: boolean;
};

export default Statistic;
