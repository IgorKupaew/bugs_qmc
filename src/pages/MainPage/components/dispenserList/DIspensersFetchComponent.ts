import { useInterval } from "../../../../hooks/useInterval";
import Container from "typedi";

import { DispensersService } from "../../../../services/DispensersService";

const dispencerService = Container.get(DispensersService);

const DispensersFetchComponent = () => {
  const getDispensers = dispencerService.getDispensers.bind(dispencerService);
  useInterval(getDispensers);
  return null;
};

export default DispensersFetchComponent;
