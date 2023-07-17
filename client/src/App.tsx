import RouteProvider from './Routes';
import FrontError from './components/error/ServerError';
import GlobalNavigationBar from './components/header/GlobalNavigationBar';

function App() {
  return (
    <RouteProvider>
      <GlobalNavigationBar />
      <FrontError />
    </RouteProvider>
  );
}

export default App;
