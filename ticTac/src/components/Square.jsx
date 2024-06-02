export const Square = ({ children, isSelected, updateBoard, index }) => {
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