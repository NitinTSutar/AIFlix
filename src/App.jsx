import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utilts/appStore";

function App() {
    return (
        <Provider store={appStore}>
            <Body />
        </Provider>
    );
}

export default App;
