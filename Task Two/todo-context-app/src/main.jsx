import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoProvider } from './context/TodoContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider >
      <App />
    </TodoProvider>
  </StrictMode>,
)
