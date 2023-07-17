import RouteProvider from './Routes';
import GlobalNavigationBar from './components/header/GlobalNavigationBar';

function App() {
  return (
    <RouteProvider>
      <GlobalNavigationBar />
    </RouteProvider>
  );
}

export default App;
