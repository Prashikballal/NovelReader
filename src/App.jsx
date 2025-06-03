// main.jsx or App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NovelList from './Components/NovelList';
import NovelReader from './Components/NovelReader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NovelList />} />
        <Route path="/novel/:id" element={<NovelReader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
