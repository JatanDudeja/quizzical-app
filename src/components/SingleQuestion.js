import React from 'react';

export default function SingleQuestion(props){
    let styles = {}

    if(props.selectedAnswer == ""){
        styles = {'border': '0.79px solid #4D5B9E', 'border-radius': '7.71045px', 'background' : "#F5F7FB"}
    }
    else{
        styles = {'background' : '#D6DBF5', 'border-radius': '7.71045px'}
    }


    const options = props.options.map(function(option, index){
        
        // let styles = {'border': '0.79px solid #4D5B9E', 'border-radius': '7.71045px', 'background' : "#F5F7FB"}
        // if(props.selectedAnswer == option){
            //     styles = {'background' : '#D6DBF5', 'border-radius': '7.71045px'}
            // }
        
        return(
            <button
                key = {index}
                onClick = {() => props.updateAnswer(props.quest, option)}
                className = { ` ${(props.submitAnswer && props.submitPara) ? ((option == props.selectedAnswer && props.selectedAnswer == props.correctAnswer) ? 'correct buttonText' : (option == props.selectedAnswer && props.selectedAnswer != props.correctAnswer) ? 'wrong buttonText' : (option == props.correctAnswer) ? "correct buttonText" : "default buttonText") : (option == props.selectedAnswer ? 'selected buttonText' : "default buttonText")}
                
            `
            
            }
                // style={styles}
            >{option}</button>
        )
    })
    
    return(
        <div className="singleQuestion-container">
            <p className='question'>{props.quest}</p>
            <div className='options-container'>
                <div className='option-container'>
                    {options}
                </div>
            </div>
            <hr></hr>
        </div>
    )
}