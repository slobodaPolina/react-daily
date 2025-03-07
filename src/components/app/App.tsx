import './App.scss';
import { Counter } from '../counter/Counter.tsx';

function App() {
  return (
    <div className="wrapper">
      <h1>Vite + React</h1>
      <div>
        <Counter />
      </div>
    </div>
  );
}

export default App;
