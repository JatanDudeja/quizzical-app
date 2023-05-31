import React from 'react'

export default function StartScreen(props) {
    return (
        <div className='startScreenContainer'>
            <div className='startScreen-container-things'>
                <h2 className='startScreen-heading'>Quizzical</h2>
                <p className='startScreen-para'>Get ready to play the game!</p>
                {/* start quiz button */}
                <button onClick = {props.startGame} className='startScreen-button'><span>Start Quiz!</span></button>
            </div>
        </div>
    )
}