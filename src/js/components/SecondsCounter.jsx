import React from "react";
import { 
    ClockIcon, 
    ResetIcon, 
    StopwatchIcon, 
    TimerIcon, 
    SkullIcon,
    WarningIcon,
    HourglassStartIcon
} from './icons.jsx';

const SecondsCounter = ({ 
    seconds, 
    isCountdown, 
    isGameMode,
    onReset, 
    onToggleMode,
    onStartGame,
    countdownValue,
    onCountdownChange 
}) => {
    // Convertir seconds a string y rellenar con ceros a la izquierda para tener 6 dígitos
    const displaySeconds = Math.abs(seconds);
    const secondsStr = displaySeconds.toString().padStart(6, '0');
    
    // Dividir en dígitos individuales
    const digits = secondsStr.split('');
    
    return (
        <div className="counter-container">
            {/* Contador principal */}
            <div className="counter-display">
                {/* Icono del reloj */}
                <div className="clock-icon">
                    <ClockIcon />
                </div>
                
                {/* Dígitos del contador */}
                {digits.map((digit, index) => (
                    <div key={index} className="digit-box">
                        {digit}
                    </div>
                ))}
            </div>
            
            {/* Controles */}
            <div className="row justify-content-center controls-section">
                <div className="col-auto">
                    {!isGameMode && (
                        <>
                            <button className="btn btn-danger control-button" onClick={onReset}>
                                <ResetIcon /> <span className="ms-2">Reiniciar</span>
                            </button>
                            
                            <button 
                                className={`btn ${isCountdown ? 'btn-info' : 'btn-outline-info'} control-button`}
                                onClick={onToggleMode}
                            >
                                {isCountdown ? <TimerIcon /> : <StopwatchIcon />} <span className="ms-2"></span>
                                {isCountdown ? 'Cuenta Regresiva' : 'Cronómetro'}
                            </button>
                        </>
                    )}
                    
                    {/* Botón del juego */}
                    {!isGameMode && (
                        <button 
                            className="btn btn-dark control-button"
                            onClick={onStartGame}
                            style={{backgroundColor: '#8B0000', borderColor: '#8B0000'}}
                        >
                            <SkullIcon /> <span className="ms-2">Quiero jugar a un juego</span>
                        </button>
                    )}
                    
                    {/* Mensaje e imagen durante el juego */}
                     {isGameMode && (
                         <div className="text-center" style={{margin: '20px 0'}}>
                             <div className="alert alert-danger" style={{margin: '10px 0'}}>
                                 <WarningIcon /> <span className="me-2"></span>
                                 <strong>¡EL JUEGO HA COMENZADO!</strong>
                             </div>
                             <div style={{margin: '20px 0'}}>
                                 <img 
                                     src="/src/img/jigsaw.jpg" 
                                     alt="Jigsaw" 
                                     style={{
                                         width: '200px', 
                                         height: '200px',
                                         borderRadius: '10px',
                                         boxShadow: '0 0 20px rgba(139, 0, 0, 0.5)',
                                         animation: 'pulse 2s infinite'
                                     }}
                                 />
                             </div>
                         </div>
                     )}
                </div>
            </div>
            
            {/* Input para cuenta regresiva (solo si no está en modo juego) */}
            {isCountdown && !isGameMode && (
                <div className="row justify-content-center countdown-input-section">
                    <div className="col-auto">
                        <div className="input-group">
                            <span className="input-group-text">
                                <HourglassStartIcon />
                            </span>
                            <input 
                                type="number" 
                                className="form-control countdown-input" 
                                placeholder="Segundos iniciales"
                                value={countdownValue}
                                onChange={(e) => onCountdownChange(parseInt(e.target.value) || 0)}
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecondsCounter;