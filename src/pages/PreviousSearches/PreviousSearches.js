import { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import { PreviousMovies, PreviousRequests } from "./";

const TabPanel = ({ children, value, index }) => {
  return <div>{value === index && <h1>{children}</h1>}</div>;
};

const PreviousSearches = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <h1>PREVIOUS SEARCHES</h1>
      <div>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Previous searches" />
          <Tab label="Previous movies" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <PreviousRequests />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <PreviousMovies />
        </TabPanel>
      </div>
    </>
  );
};

export { PreviousSearches };
