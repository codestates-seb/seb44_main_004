import RouteProvider from './Routes';
import GlobalNavigationBar from './components/gnb/GlobalNavigationBar';

function App() {
  return (
    <RouteProvider>
      <GlobalNavigationBar />
    </RouteProvider>
  );
}

export default App;
