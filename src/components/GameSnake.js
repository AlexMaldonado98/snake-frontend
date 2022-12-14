import { useRef, useEffect, useState } from "react";

const state_running = 1;
const state_losing = 2;
const state_pause= 3;
const hz = 70;
const tamano_cuadro = 10;
const borde_ancho = 25;
const borde_alto = 25;
const crecimiento_escala = 5;
const teclas = {
    'A': [-1, 0],
    'D': [1, 0],
    'W': [0, -1],
    'S': [0, 1],
    'a': [-1, 0],
    'd': [1, 0],
    'w': [0, -1],
    's': [0, 1]
};

let estados = {
    canvas: null,
    contexto: null,
    snake: [{ x: 0, y: 0 }],
    direccion: { x: 1, y: 0 },
    presa: { x: 0, y: 0 },
    growing: 5,
    puntaje: 0,
    puntajeLastgame: 0,
    estadoJuego: state_running
}
let timer;
export const GameSnake = ({ handleSignOut, handleAddNewScore, scores }) => {
    console.log('render snake');

    let [score, setScore] = useState(0);
    const [state,setState] = useState(false);

    const canvasRef = useRef(null);
    
    const signOut = () => {
        handleSignOut();
        clearInterval();
    };
    useEffect(() => {

        window.onload = function () {
            estados.canvas = canvasRef.current;
            estados.contexto = estados.canvas.getContext('2d');
            console.log('me ejecute');

            estados.presa = randomXY();
            
            window.onkeydown = function (e) {
                const direction = teclas[e.key];
                if (direction) {
                    const [x, y] = direction;
                    if (-x !== estados.direccion.x && -y !== estados.direccion.y) {
                        estados.direccion.x = x;
                        estados.direccion.y = y;
                    }
                }
            }
            tick();
        }()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const randomXY = () => {
        return {
            x: parseInt(Math.random() * borde_ancho),
            y: parseInt(Math.random() * borde_alto)
        }
    };

    const colision = () => {
        const cabeza = estados.snake[0];
        if (
            cabeza.x < 0
            || cabeza.x >= borde_ancho
            || cabeza.y >= borde_alto
            || cabeza.y < 0
        ) {
            return true;
        }

        for (var idx = 1; idx < estados.snake.length; idx++) {
            const sq = estados.snake[idx]

            if (sq.x === cabeza.x && sq.y === cabeza.y) {
                return true
            }
        }
        return false
    }

    const buttonW = () => {
        const { x, y } = { x: 0, y: -1 };
        if (-x !== estados.direccion.x && -y !== estados.direccion.y) {
            estados.direccion.x = x;
            estados.direccion.y = y;
        }
    }
    const buttonA = () => {
        const { x, y } = { x: -1, y: 0 };
        if (-x !== estados.direccion.x && -y !== estados.direccion.y) {
            estados.direccion.x = x;
            estados.direccion.y = y;
        }
    }
    const buttonD = () => {
        const { x, y } = { x: 1, y: 0 };
        if (-x !== estados.direccion.x && -y !== estados.direccion.y) {
            estados.direccion.x = x;
            estados.direccion.y = y;
        }
    }
    const buttonS = () => {
        const { x, y } = { x: 0, y: 1 };
        if (-x !== estados.direccion.x && -y !== estados.direccion.y) {
            estados.direccion.x = x;
            estados.direccion.y = y;
        }
    }

    const drawPixel = (color, x, y) => {
        estados.contexto.fillStyle = color;
        estados.contexto.fillRect(
            x * tamano_cuadro,
            y * tamano_cuadro,
            tamano_cuadro,
            tamano_cuadro
        );
    }

    const draw = () => {
        estados.contexto.clearRect(0, 0, 250, 250);

        for (var idx = 0; idx < estados.snake.length; idx++) {
            const { x, y } = estados.snake[idx];
            drawPixel('#22dd22', x, y);
        }

        const { x, y } = estados.presa;
        drawPixel('yellow', x, y);
    }

    const handleScore = (puntajeLastGame) => {

        handleAddNewScore(puntajeLastGame);
        setScore(0);
        estados.puntaje = 0
    };

    const tick = () => {
        if(estados.estadoJuego === 3){
            return null
        }
        const cabeza = estados.snake[0];
        const dx = estados.direccion.x;
        const dy = estados.direccion.y;
        const highestIndex = estados.snake.length - 1;

        let intervalo = hz;
        let tamano = {};
        let puntuo = (
            cabeza.x === estados.presa.x && cabeza.y === estados.presa.y
        )

        Object.assign(tamano, estados.snake[highestIndex])

        if (estados.estadoJuego === state_running) {
            for (let idx = highestIndex; idx >= 0; idx--) {
                const sq = estados.snake[idx];

                if (idx === 0) {
                    // eslint-disable-next-line no-unused-expressions
                    sq.x += dx;
                    sq.y += dy;
                } else {
                    sq.x = estados.snake[idx - 1].x;
                    sq.y = estados.snake[idx - 1].y;
                }
            }
        } else if (estados.estadoJuego === state_losing) {
            intervalo = 30;
            if (estados.snake.length > 0) {
                estados.snake.splice(0, 1);

            }
            if (estados.snake.length === 0) {
                handleScore(estados.puntaje);
                estados.estadoJuego = state_running;
                estados.snake.push(randomXY());
                estados.presa = randomXY();
                estados.growing = 5;
                intervalo = hz;
                tamano = {};
            }
        }

        if (colision()) {
            estados.estadoJuego = state_losing
            estados.growing = 0;
        }

        if (puntuo) {
            estados.growing += crecimiento_escala;
            estados.presa = randomXY();
            setScore(prevScore => prevScore + 5);
            estados.puntaje += 5;
        }

        if (estados.growing > 0) {
            estados.snake.push(tamano);
            estados.growing -= 1;
        }


        requestAnimationFrame(draw);
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(() => {
            tick()
        }, intervalo);
    }

    useEffect(() => {
        if(state){
            estados.estadoJuego = state_pause;
        }else{
            estados.estadoJuego = state_running;
        }
    },[state]);

    return (
        <div>
            <canvas ref={canvasRef} className="canvas mb-4" width="250px" height="250px"></canvas>
            <div className="container-fluid">
                <div className="row alingButtons my-4">
                    <div className="col-4"><button onClick={() => buttonW()}>W</button></div>
                </div>
                <div className="row alingButtons mb-4">
                    <div className="col-8 ad">
                        <button onClick={() => buttonA()}>A</button>
                        <button onClick={() => buttonD()}>D</button>
                    </div>
                </div>
                <div className="row alingButtons">
                    <div className="col-4">
                        <button onClick={() => buttonS()}>S</button>
                    </div>
                </div>
            </div>
            <div className="mt-2 d-flex justify-content-center">
                <button onClick={signOut} className='bg-danger f1-5' >SIGN OUT</button>
                <button onClick={() => setState(!state)} >{state ? 'Play' : 'Pause'}</button>
            </div>
            <div className="score">
                <p>{`Score: ${score}`}</p>
            </div>
        </div>
    );
};