
import { useEffect, useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS, WINNER_COMBOS } from "./constants.js"
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'



function App() {
  //para que el usuario pueda ver los cambios cuando clicke en
  //en el tablero, necesitamos meter board dentro de App, para que
  //que pinte cada vez quecambie de estado
  //pasamos de esto
  //const board = Array(9).fill(null)
  //a esto
  //const [board, setBoard] = useState(Array(9).fill(null))
  //tenemos el estado inicial que el board y el segundo
  //es una forma de actualizar el board

  //para ver como queda, lo rellenamos manualmente
  //const [board, setBoard] = useState(['x', 'o', 'o', 'o', 'x', 'x', 'o', 'x', 'x'])

  //Volvemos a lo correcto
  const [board, setBoard] = useState(Array(9).fill(null))

  //vamos a necesitar un estado para saber a quién le toca
  const [turn, setTurn] = useState(TURNS.X)

  //creamos un estado para saber si hay ganador
  const [winner, setWinner] = useState(null) //null no hay ganador y false hay empate



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  }



  const updateBoard = (index) => {

    //no actualices esta posición si ya tiene algo
    if (board[index] || winner) return
    //hacemos una copia para evitar modificar el original
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //vamos a cambiar un turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate

    }

  }


  return (
    < main className='board' >
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            //con el map rellenamos el array, el primer parámetro
            //es el valor que tenga ese array, como los tenemos vacíos,
            //psamos un _ para decir, que no pasamos nada
            //por defecto, el segundo valor es el index, y ese si que
            //queremos que lo pase
            return (
              // para renderizar una lista de elemento necesitamos una key
              // en este caso es index
              // también pasamos como prop index
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}

              </Square>
            )
          })
        }

      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </ main >
  )
}

export default App
