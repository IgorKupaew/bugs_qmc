import React from "react";
import Container from "typedi";
import { observer } from "mobx-react-lite";

import { FetchService } from "../../../../services/FetchService";
import { DispensersService } from "../../../../services/DispensersService";

import { Loader } from "../../../../components/loader";
import DispensersFetchComponent from "./DIspensersFetchComponent";
import { DispenserCard } from "../dispenserCard/DispenserCard";

import styles from "./DispenserList.module.scss";

const dispencerService = Container.get(DispensersService);
const fetchService = Container.get(FetchService);

export const DispenserList = observer(() => {
  const isFirstLoading = dispencerService.isFirstLoading;
  const dispensers = dispencerService.dispensersList;
  const isLoading = dispencerService.isLoading;
  const fetchStatus = fetchService.fetchStatus;

  if (isLoading && isFirstLoading) {
    return (
      <div className={styles.loaderContainer}>
        {fetchStatus && <DispensersFetchComponent />}
        <Loader />
      </div>
    );
  }

  if (!dispensers.length) {
    return (
      <div className={styles.loaderContainer}>
        {fetchStatus && <DispensersFetchComponent />}
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.dispensers}>
      {fetchStatus && <DispensersFetchComponent />}
      {dispensers.map((el) => (
        <DispenserCard shouldBeIncludedToCalc={el.shouldBeIncludedToCalc} element={el} />
      ))}
    </div>
  );
});
