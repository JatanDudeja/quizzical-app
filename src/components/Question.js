import React from 'react'
import Data from '../Data'
import SingleQuestion from './SingleQuestion'

export default function Question() {
    //stores all the questions
    const [questions, setQuestions] = React.useState([])


    const [questionAndAnswers, setQuestionAndAnswers] = React.useState([])

    const [submitted, setSubmitted] = React.useState(false)


    const [submitPara, setSubmitPara] = React.useState(false)


    const [checkAnswers, setCheckAnswers] = React.useState(0)

    React.useEffect(function () {

        if(questions.length === 0){
            fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")

            .then((response) => response.json())

            .then((data) => {
                setQuestions(data.results);

                setQuestionAndAnswers(data.results.map(function (ques) {
                    return {
                        questio: ques.question,
                        correctAns: ques.correct_answer,
                        optionsArray: shuffleArray([...ques.incorrect_answers, ques.correct_answer]),
                        selectedAns: "",
                    }
                }))
            })
        }
    }, [questions])


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


    function updateAnswer(question, answer) {

        // console.log(question + " " + answer);

        setQuestionAndAnswers((questionsObject) => {
            return questionsObject.map((element) => {
                return (
                    element.questio == question ? { ...element, selectedAns: answer } : element
                )
            })
        })


    }



    function submit() {
        let check = true;
        for (let i = 0; i < questionAndAnswers.length; i++) {
            if (questionAndAnswers[i].selectedAns == "") {
                check = false;
                break;
            }

            if (questionAndAnswers[i].selectedAns == questionAndAnswers[i].correctAns) {
                setCheckAnswers((prevCheckAnswer) => {
                    return prevCheckAnswer + 1
                })
            }

        }


        if (check == true) {
            setSubmitPara(true)
        }



        setSubmitted(true)




    }





    const questionMapped = questionAndAnswers.map(function (ques, index) {
        return (
            <SingleQuestion
                key={index}
                quest={ques.questio}
                options={[...ques.optionsArray]}
                selectedAnswer={ques.selectedAns}
                correctAnswer={ques.correctAns}
                updateAnswer={updateAnswer}
                submitAnswer={submitted}
                submitPara={submitPara}
            />

        )
    })

    function playAgain(){
        setQuestions([])
        setQuestionAndAnswers([])
        setSubmitted(false)
        setSubmitPara(false)
        setCheckAnswers(0)



    }


    return (
        <div className='main-question-container'>
            <div className='questionContainer'>
                {questionMapped}
            </div>

            <p className='submitButtonParaTag'>
                {submitted ? (submitPara ? <span className='submitPara'>{`You have got ${checkAnswers} / 5 correct answers.`}</span> : <span className='submitPara'>Please select the answers to all the questions!</span>) : ""}
                
                {submitted && submitPara ? <button onClick={playAgain} className='submitQuizButton'>Play Again?</button> : <button onClick={submit} className='submitQuizButton'>Check Answers</button>}
                
                {/* <button onClick={submit} className='submitQuizButton'>Submit Quiz</button> */}
            </p>
        </div>

    )
}