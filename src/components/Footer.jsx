import { Heart, Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Accessible mental health support
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('hero')}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solutions')}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  >
                    Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('partners')}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  >
                    Partners
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
                >
                  Crisis Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="mailto:support@mindable.app"
                className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Email us"
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
            <p className="text-gray-400 text-lg">
              Emergency: Call 988 (Suicide & Crisis Lifeline)
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            &copy; {currentYear} MindAble. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
