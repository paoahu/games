
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
    updateBoard()
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

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

  const updateBoard = () => {

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
    </ main >
  )
}

export default App
