import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import PreviousSearches from "./pages/PreviousSearches";

export default function App() {
    return (
        <Router>
            <div>
                <Navbar />

                <Switch>
                    <Route path="/movies">
                        <Movies />
                    </Route>
                    <Route path="/previous-searches">
                        <PreviousSearches />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
