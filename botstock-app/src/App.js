import './App.css';
import LScontainer from './components/Loginsignupcontainer/LScontainer';
import Navigationbar from './components/navigationbar/navigationbar';

const App = () => {
  return (
    <div className="App">
      <Navigationbar/>
      <LScontainer/>
    </div>
  );
}

export default App;
