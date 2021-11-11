import './App.css';
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App" style={{flex: 1}}>
      <header className="App-header" style={{backgroundColor: 'white'}}>
        <TopBar/>
      </header>
    </div>
  );
}

export default App;