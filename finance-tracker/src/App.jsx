import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Dashboard />
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
