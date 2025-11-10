import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is MindAble accessible for people with disabilities?',
    answer: 'Yes! MindAble is designed with WCAG 2.1 AAA compliance. We support screen readers, keyboard navigation, voice commands, and high-contrast modes. Every feature is tested with assistive technologies.',
  },
  {
    question: 'How does the voice conversation feature work?',
    answer: 'Simply speak to MindAble using your device\'s microphone. Our AI understands natural speech and responds with empathy. You can also have responses read aloud to you.',
  },
  {
    question: 'Is my conversation private and secure?',
    answer: 'Absolutely. All conversations are encrypted end-to-end. We never share your data with third parties. You can delete your conversation history at any time.',
  },
  {
    question: 'Can I use MindAble if I have a visual impairment?',
    answer: 'Yes! MindAble works seamlessly with screen readers like JAWS, NVDA, and VoiceOver. All interactive elements have proper ARIA labels and keyboard shortcuts.',
  },
  {
    question: 'Is there a cost to use MindAble?',
    answer: 'MindAble offers a free tier with essential features. Premium features include unlimited voice conversations, advanced mood tracking, and priority support.',
  },
  {
    question: 'What languages does MindAble support?',
    answer: 'Currently, MindAble supports English with plans to add more languages. The AI is culturally sensitive and adapts to diverse communication styles.',
  },
  {
    question: 'Can MindAble replace my therapist?',
    answer: 'No. MindAble is a supportive tool, not a replacement for professional therapy. For serious mental health concerns, please consult a licensed therapist or call emergency services.',
  },
  {
    question: 'How do I get started?',
    answer: 'Click the "Get Started" button, create an account, and begin your first conversation. No credit card required for the free tier.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about MindAble
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md border border-purple-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-purple-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p className="px-6 pb-6 text-gray-600 text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
