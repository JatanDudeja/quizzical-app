import React from 'react'
import Data from '../Data'
import SingleQuestion from './SingleQuestion'

export default function Question() {
    const [questions, setQuestions] = React.useState([])


    const [questionAndAnswers, setQuestionAndAnswers] = React.useState([])

    const [submitted, setSubmitted] = React.useState(false)


    const [submitPara, setSubmitPara] = React.useState(false)


    const [checkAnswers, setCheckAnswers] = React.useState(0)

    React.useEffect(function () {
        setQuestions(Data.map(function (ques) {
            return {
                questio: ques.question,
                correctAns: ques.correct_answer,
                optionsArray: shuffleArray([...ques.incorrect_answers, ques.correct_answer]),
                selectedAns: "",
            }
        }))
    }, [])


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

        setQuestions((questionsObject) => {
            return questionsObject.map((element) => {
                return (
                    element.questio == question ? { ...element, selectedAns: answer } : element
                )
            })
        })


    }



    function submit() {
        let check = true;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].selectedAns == "") {
                check = false;
                break;
            }

            if (questions[i].selectedAns == questions[i].correctAns) {
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





    const questionMapped = questions.map(function (ques, index) {
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


    return (
        <div className='main-question-container'>
            <div className='questionContainer'>
                {questionMapped}
            </div>

            <p className='submitButtonParaTag'>
                {submitted ? (submitPara ? <span className='submitPara'>{`You have got ${checkAnswers} / 5 correct answers.`}</span> : <span className='submitPara'>Please select the answers to all the questions!</span>) : ""}
                <button onClick={submit} className='submitQuizButton'>Submit Quiz</button>
            </p>
        </div>

    )
}