import { useContext } from "react";
import { MasterContext } from "../context/master";

export const useMaster = () => {
  const context = useContext(MasterContext);

  return context;
};