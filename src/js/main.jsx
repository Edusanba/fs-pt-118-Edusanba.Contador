import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import SecondsCounter from './components/SecondsCounter';

// Crear el root una sola vez
const root = ReactDOM.createRoot(document.getElementById('root'));

// Estado del contador
let seconds = 0;
let isCountdown = false;
let countdownValue = 10;
let intervalId = null;
let isGameMode = false;

// Función para iniciar el contador automáticamente
const startAutoCounter = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    if (isCountdown) {
      if (seconds > 0) {
        seconds--;
      } else {
        // Cuando llega a 0 en cuenta regresiva, reinicia automáticamente
        seconds = countdownValue;
      }
    } else {
      seconds++;
    }
    renderCounter();
  }, 1000);
};

const resetCounter = () => {
  seconds = isCountdown ? countdownValue : 0;
  renderCounter();
};

const toggleMode = () => {
  isCountdown = !isCountdown;
  seconds = isCountdown ? countdownValue : 0;
  startAutoCounter();
  renderCounter();
};

const handleCountdownChange = (value) => {
  countdownValue = value;
  if (isCountdown) {
    seconds = countdownValue;
  }
  renderCounter();
};

// Función para iniciar el juego
const startGame = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  isGameMode = true;
  isCountdown = true;
  seconds = 60;
  intervalId = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      // Cuando el juego termina
      clearInterval(intervalId);
      intervalId = null;
      alert('¡Tiempo agotado! El juego ha terminado.');
      // Volver al modo normal
      isGameMode = false;
      isCountdown = false;
      seconds = 0;
      startAutoCounter();
    }
    renderCounter();
  }, 1000);
  renderCounter();
};

// Función para renderizar el componente
const renderCounter = () => {
  root.render(
    <React.StrictMode>
      <SecondsCounter 
        seconds={seconds}
        isCountdown={isCountdown}
        isGameMode={isGameMode}
        onReset={resetCounter}
        onToggleMode={toggleMode}
        onStartGame={startGame}
        countdownValue={countdownValue}
        onCountdownChange={handleCountdownChange}
      />
    </React.StrictMode>
  );
};

// Renderizar inicialmente
renderCounter();

// Iniciar el contador automáticamente al cargar la página
startAutoCounter();
