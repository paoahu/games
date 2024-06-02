
import { useEffect, useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({ children, isSelected, updateBoard, index }) => {
  //creamos una componente square. El children es lo que va a haber
  //dentro del tablero, si es una X o una O. 
  //con updateBoard tenemos una forma de actualiazr el tablero
  //tendremos el index para saber ese cuadrado que posición tiene
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]



]

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

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null //no tenemos ganador

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
      setWinner(newWinner)
    } // check if the game is over

  }


  return (
    < main className='board' >
      <h1>Tic Tac Toe</h1>
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

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </ main >
  )
}

export default App
