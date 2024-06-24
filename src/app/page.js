"use client"
import { useState } from "react";

export default function TikTakToeB() {

    const [jogando, setJogando] = useState(false);
    const [venceu, setVenceu] = useState();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-lg font-semibold mb-2">Regras do Jogo:</p>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>9 quadrados para jogar</li>
                  <li>2 jogadores, alternar entre jogadores quando feita jogada.</li>
                  <li>Ganha quem fizer 3 linhas, ou colunas ou diagonais seguidas.</li>
                  <li>Quando alguém ganhar, mostrar quem foi o vencedor e mostrar um botão para resetar o jogo.</li>
              </ul>
              
              <div className="mt-8">
                  <Board />
              </div>
          </div>
      </div>
  );
    
}
function Square ({value, onClick}) {
    return (
        <button className=" text-xl border w-12 h-12 mx-auto" onClick={onClick}>{value}</button>
    );
}
/* componente que representa o tabuleiro do jogo */
function Board () {

    /* declaração de estados usando o hook useState do React */
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [jogadas, setJogadas] = useState(0)
    
    /* função de clicar no quadrado do jogo */
    function handleClick(i) {
        calculateWinner(i)
        setJogadas(anterior => anterior+1)
       /* vai verificar se o quadrado ja foi preenchido ou se tem um vencedor */
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        /* cria uma copia do array dos quadrados */
        const nextSquares = squares.slice();
        /* vai prencher o quadrado com X ou O */
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O"

        }
       /* troca o jogador */
        setXIsNext(!xIsNext);
       /*atualiza o estado do quadrado */
        setSquares(nextSquares);
        
    }
    /* calcula o vencedor do jogo */
    const winner = calculateWinner(squares);
    const empate = jogadas >= 9 
    console.log(jogadas)
    let status;
    /* define o status do jogo */
    if (winner) {
        status = "Vencedor: " + winner;
    } else if (empate ) {
        status = "Empate";
    }
    else {
        status = "Proximo Jogador: " + (xIsNext ? "X" : "O");
    }


    function handleReset() {
        setSquares(Array(9).fill(null))
        setJogadas(0)
    }

    /* renderização do jogo da velha */ /* e */ /* função para clicar e resetar os quadrados de novo */  
    return (
     

     <div>
           <div className="status">{status}</div>
            <div className="grid grid-cols-3 w-[140px]">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
            
        <div>
           
            {(winner || empate)  && <button onClick={() => handleReset()} className="py-2 px-10 rounded">Resetar</button>}
        </div>
    
        </div>
    );
}


function calculateWinner(squares) {
    /* Lista de todas as combinações de linhas, colunas e diagonais que pode vencer */
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    /* vai analisar as combinações e ver se alguém venceu */
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
           /* retorna o valor de quem venceu */
            return squares[a];
        }
    }
    /* retorna null se não houver um vencedor */
    return null;
    }