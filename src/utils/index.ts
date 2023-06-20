import Item from "../types/Item.types";

const findNonNullIndexFromEndToStart = (array: Array<Item | undefined>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i]) return i;
  }
  return -1;
};

export { findNonNullIndexFromEndToStart };
