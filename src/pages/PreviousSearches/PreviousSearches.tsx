import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from "@material-ui/core";

import { PreviousMovies, PreviousRequests } from ".";
import { setTab } from "../../redux/actions";
import { RootState } from "../../redux/rootReducer";

interface IProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: IProps) => {
  return <div>{value === index && <h1>{children}</h1>}</div>;
};

const PreviousSearches = () => {
  const dispatch = useDispatch();
  const tab = useSelector(({ tabsReducer: { tab } }: RootState) => tab);

  const handleChange = (
    event: React.SyntheticEvent<EventTarget>,
    newTab: number
  ) => {
    dispatch(setTab(newTab));
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