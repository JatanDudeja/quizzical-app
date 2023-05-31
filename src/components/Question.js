import React from 'react'
import Data from '../Data'
import SingleQuestion from './SingleQuestion'

export default function Question(){
    const [questions, setQuestions] = React.useState([])


    const [questionAndAnswers, setQuestionAndAnswers] = React.useState([])

    const [submitted, setSubmitted] = React.useState(false)

    React.useEffect(function(){
       setQuestions(Data.map(function(ques){
            return{
                questio: ques.question,
                correctAns : ques.correct_answer,
                optionsArray : shuffleArray([...ques.incorrect_answers, ques.correct_answer]),
                selectedAns : ""
            }
        }))
    },[])


    // shuffling of options array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array
    }


    function updateAnswer(question, answer){

        // console.log(question + " " + answer);

        setQuestions((questionsObject) => {
            return questionsObject.map((element) => {
                return(
                    element.questio == question ? {...element, selectedAns : answer} : element
                )
            })
        })


    }



    function submit(){
        setSubmitted(true)
        
    }





    const questionMapped = questions.map(function(ques, index){
        return(
            <SingleQuestion
                key = {index}
                quest = {ques.questio}
                options = {[...ques.optionsArray]}
                selectedAnswer = {ques.selectedAns}
                correctAnswer = {ques.correctAns}
                updateAnswer = {updateAnswer}
            />
            
        )
    })


    return(
        <div className='questionContainer'>
            {questionMapped}
            <button onClick = {submit}className='submitQuizButton'>Submit Quiz</button>
        </div>
    )
}