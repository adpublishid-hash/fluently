import React, { useState } from 'react';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    LightBulbIcon, 
    RefreshIcon,
    ChevronLeftIcon,
    PlayCircleIcon, 
    TrendUpIcon,
    InfoIcon
} from '../../../../../components/Icons';

export interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface QuizSectionProps {
    questions: Question[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [answers, setAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));

    const currentQuestion = questions[currentQuestionIdx];
    const isLastQuestion = currentQuestionIdx === questions.length - 1;

    const handleAnswerSelect = (option: string) => {
        if (showResult || completed) return;
        setSelectedAnswer(option);
    };

    const handleSubmitAnswer = () => {
        if (!selectedAnswer) return;

        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        const newAnswers = [...answers];
        newAnswers[currentQuestionIdx] = selectedAnswer;
        setAnswers(newAnswers);

        setShowResult(true);
    };

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            setCompleted(true);
        } else {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIdx(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setCompleted(false);
        setAnswers(new Array(questions.length).fill(null));
    };

    if (completed) {
        const percentage = Math.round((score / questions.length) * 100);
        let message = "";
        let colorClass = "";
        
        if (percentage >= 80) {
            message = "Excellent! You have mastered this lesson.";
            colorClass = "text-green-600 bg-green-50 border-sky-200";
        } else if (percentage >= 60) {
            message = "Good job! But there's room for improvement.";
            colorClass = "text-yellow-600 bg-yellow-50 border-yellow-200";
        } else {
            message = "Keep practicing. Review the lesson and try again.";
            colorClass = "text-red-600 bg-red-50 border-red-200";
        }

        return (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center animate-fade-in">
                <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-full ${percentage >= 60 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        <TrendUpIcon className="w-12 h-12" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
                <p className="text-slate-600 mb-6">You scored {score} out of {questions.length}</p>
                
                <div className={`p-4 rounded-xl border mb-8 ${colorClass}`}>
                    <p className="font-bold">{message}</p>
                    <p className="text-sm mt-1 opacity-80">{percentage}% Accuracy</p>
                </div>

                <button 
                    onClick={handleRetry}
                    className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                    <RefreshIcon className="w-5 h-5" />
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-violet-50 p-2 rounded-lg text-violet-600">
                        <LightBulbIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Practice Exercises</h2>
                        <p className="text-xs text-slate-500">Question {currentQuestionIdx + 1} of {questions.length}</p>
                    </div>
                </div>
                <div className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                    Score: {score}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                <div 
                    className="bg-violet-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            {/* Question */}
            <div className="mb-6">
                <h3 className="text-base text-slate-800 font-medium leading-relaxed">
                    {currentQuestion.question}
                </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.correctAnswer;
                    
                    let btnClass = "border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700";
                    
                    if (showResult) {
                        if (option === currentQuestion.correctAnswer) {
                            btnClass = "bg-green-50 border-sky-500 text-green-700 font-bold";
                        } else if (isSelected && !isCorrect) {
                            btnClass = "bg-red-50 border-red-500 text-red-700 opacity-60";
                        } else {
                            btnClass = "border-slate-100 text-slate-400 opacity-50";
                        }
                    } else if (isSelected) {
                        btnClass = "bg-violet-50 border-violet-500 text-violet-700 font-bold shadow-sm ring-1 ring-violet-500";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showResult}
                            className={`w-full text-left p-4 rounded-xl border transition-all text-sm relative ${btnClass}`}
                        >
                            <span className="mr-2 opacity-60">{String.fromCharCode(65 + idx)}.</span>
                            {option}
                            
                            {showResult && option === currentQuestion.correctAnswer && (
                                <CheckCircleIcon className="w-5 h-5 text-green-500 absolute right-4 top-1/2 -translate-y-1/2" />
                            )}
                            {showResult && isSelected && option !== currentQuestion.correctAnswer && (
                                <XCircleIcon className="w-5 h-5 text-red-500 absolute right-4 top-1/2 -translate-y-1/2" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Feedback & Navigation */}
            {showResult && (
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fade-in">
                    <div className="flex gap-2">
                        <InfoIcon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-slate-700 mb-1">Explanation</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {currentQuestion.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                {!showResult ? (
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            selectedAnswer 
                            ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg hover:shadow-xl active:scale-95' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        {isLastQuestion ? "Finish Quiz" : "Next Question"}
                        <ChevronLeftIcon className="w-4 h-4 rotate-180" />
                    </button>
                )}
            </div>
        </section>
    );
};
