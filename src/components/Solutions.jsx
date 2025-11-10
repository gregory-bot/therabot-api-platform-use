import { MessageCircle, Mic, BookOpen, Activity, Users, Shield } from 'lucide-react';

const solutions = [
  {
    icon: MessageCircle,
    title: 'Chat Support',
    description: 'Text-based conversations with a companion available 24/7. Get support whenever you need it.',
  },
  {
    icon: Mic,
    title: 'Voice Conversations',
    description: 'Perfect for those who prefer talking over typing.',
  },
  {
    icon: BookOpen,
    title: 'Guided Journaling',
    description: 'Reflect on your thoughts and emotions with guided prompts designed for mental wellness.',
  },
  {
    icon: Activity,
    title: 'Wellness Metrics',
    description: 'Track your mental health journey with insights and progress monitoring.',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with others who understand your journey in a safe, moderated environment.',
  },
  {
    icon: Shield,
    title: 'Crisis Resources',
    description: 'Immediate access to crisis hotlines and emergency mental health resources when needed.',
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 px-6 bg-white" aria-labelledby="solutions-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="solutions-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            mental health tools designed with accessibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 focus-within:ring-2 focus-within:ring-purple-500"
              tabIndex="0"
              role="article"
              aria-label={solution.title}
            >
              <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                <solution.icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {solution.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
