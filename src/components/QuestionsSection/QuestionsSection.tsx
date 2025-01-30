import React, { useState } from 'react'
import { QuestionBlock } from './QuestionBlock/QuestionBlock'
import scrollAnimations from '../../styles/ScrollAnimation.module.css'

interface Question {
  id: number
  label: string
  content: string
}

export const QuestionsSection: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      label: 'Who is gambi.com?',
      content:
        'Kasego Global N.V. (“Gambi” or the “Company”) is an Anjouan-based company, incorporated in 2022. It operates the online casino www.gambi.com under Anjouan license no. 8048/JAZ, issued by Antillephone. Gambi strictly prohibits the use of its products and services for any illegal activities, including money laundering (ML), terrorist financing (TF), and sanctions violations. The company is committed to adhering to global best practices to prevent such misuse.',
    },
    {
      id: 2,
      label: 'Is gambi.com licensed?',
      content:
        'Gambi.com is licensed by gaming authorities in Curaçao, providing a secure and reliable online casino platform. Gambi is operated by Kasego Global N.V. under the Anjouan license no. 8048/JAZ, issued by Antillephone, with guidance from the Curaçao Gaming Control Board, authorized and regulated by the Government of Curaçao.',
    },
    {
      id: 3,
      label: 'Is it safe?',
      content:
        'Yes, gambi.com takes your safety seriously. The platform employs advanced encryption technologies to protect your personal and financial information. As a licensed online crypto casino, all transactions are secure and transparent, leveraging blockchain technology to ensure fairness and reliability. Additionally, we adhere to strict regulations and provide a secure gaming environment with provably fair games.',
    },
    {
      id: 4,
      label: 'What sports can I bet on?',
      content:
        'On gambi.com, you can bet on a wide range of sports, including soccer, tennis, basketball, ice hockey, MMA, volleyball, table tennis, American football, baseball, handball, alpine skiing, and many others. With hundreds of events across various sports, there’s something for every sports enthusiast to enjoy.',
    },
    {
      id: 5,
      label: 'How can I play the live casino?',
      content:
        'To play the live casino on gambi.com, simply navigate to the "Live Casino" section in the main menu. Choose from a variety of live dealer games, such as blackjack, roulette, or baccarat. Make sure you have a registered account and sufficient funds in your wallet to join a game. Follow the on-screen instructions to place your bets and enjoy the real-time gaming experience with professional live dealers.',
    },
  ]

  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null)

  const handleToggle = (id: number) => {
    setExpandedQuestionId((prevId) => (prevId === id ? null : id))
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionBlock
          className={`${scrollAnimations['appear-slide-left']}`}
          key={question.id}
          label={question.label}
          content={question.content}
          isExpanded={expandedQuestionId === question.id}
          onToggle={() => handleToggle(question.id)}
        />
      ))}
    </div>
  )
}
