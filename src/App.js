import './App.css';
import { MisRutas } from './router/MisRutas';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className='layout'>
      <MisRutas/>
      <ChatBot />
    </div>
  );
}

export default App;
