import useBanner from "./hooks/useBanner";
import Providers from "./Providers";

import RouteList from "./Routes/routes";
function App() {
  return (
    <Providers>
      <div className="App">
        <RouteList />
      </div>
    </Providers>
  );
}

export default App;
