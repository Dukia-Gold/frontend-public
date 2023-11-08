import { Dispatch, SetStateAction } from "react";

export const activeHandler = (
  index: number,
  initState: any[],
  setState: Dispatch<SetStateAction<any[]>>
) => {
  const statesCopy = initState.map((data, i) => {
    if (i === index) {
      return { ...data, isActive: true };
    } else {
      return { ...data, isActive: false };
    }
  });

  setState(statesCopy);
};
