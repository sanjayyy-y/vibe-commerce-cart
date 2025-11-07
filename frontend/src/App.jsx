import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;