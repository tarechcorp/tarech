// app/page.tsx (or pages/index.tsx depending on your setup)
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Shield, Users, Code, Globe, Database } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Tarech</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#research" className="text-gray-600 hover:text-blue-600">Research</Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link>
              <Link href="https://mybusiness.tarech.org" className="text-gray-600 hover:text-blue-600">Business Suite</Link>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 border-l pl-6 border-gray-300">Privacy</Link>
              <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clear App Purpose */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Advancing African AI Research
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tarech is an African AI research company dedicated to developing cutting-edge artificial intelligence technologies that address unique challenges and opportunities across the continent.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#research" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
            >
              Explore Our Research <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="https://mybusiness.tarech.org" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Visit Business Suite <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* App Name Verification Section - Matches OAuth Consent Screen */}
      <section className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Shield className="h-4 w-4 mr-2" />
            <span>Verified Application: Tarech</span>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            <strong>Tarech</strong> is the official name of our platform. Our business software solutions are available at{' '}
            <a href="https://mybusiness.tarech.org" className="text-blue-600 font-medium hover:underline">
              mybusiness.tarech.org
            </a>
          </p>
        </div>
      </section>

      {/* What We Do - Main Purpose */}
      <section id="research" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Research</h3>
              <p className="text-gray-600">
                Conducting fundamental and applied research in machine learning, natural language processing, computer vision, and responsible AI tailored for African contexts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <Database className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">African Datasets</h3>
              <p className="text-gray-600">
                Creating and curating high-quality datasets that represent African languages, cultures, and scenarios to reduce bias in AI systems.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <Code className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Open Source Tools</h3>
              <p className="text-gray-600">
                Developing and releasing open-source AI tools, libraries, and frameworks to empower African developers and researchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Research Focus Areas</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our research addresses critical challenges and opportunities in African AI
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "African Languages",
                description: "NLP models for African languages including Swahili, Hausa, Yoruba, Amharic, and more"
              },
              {
                title: "Agricultural AI",
                description: "AI solutions for crop yield prediction, pest detection, and food security"
              },
              {
                title: "Healthcare AI",
                description: "Diagnostic tools and health information systems for underserved communities"
              },
              {
                title: "Financial Inclusion",
                description: "Responsible AI for credit scoring, fraud detection, and mobile money"
              }
            ].map((focus, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{focus.title}</h3>
                <p className="text-gray-600 text-sm">{focus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Suite Section - Clarifies Subdomain */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Tarech Business Suite</h2>
              <p className="text-xl text-blue-100 mb-6">
                Commercial software solutions built from our research, available at{' '}
                <a href="https://mybusiness.tarech.org" className="font-semibold underline hover:text-white">
                  mybusiness.tarech.org
                </a>
              </p>
              <p className="text-blue-100 mb-8">
                Our business division provides enterprise-grade AI tools and software solutions for organizations across Africa, 
                powered by the latest advances from our research team.
              </p>
              <Link 
                href="https://mybusiness.tarech.org" 
                className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Visit Business Suite <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Link - Explicitly Displayed */}
      <section className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gray-50 inline-block px-6 py-3 rounded-full">
            <span className="text-gray-600 mr-2">🔒</span>
            <Link href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
              View Our Privacy Policy
            </Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link href="/terms-of-service" className="text-blue-600 hover:underline font-medium">
              Terms of Service
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We are committed to protecting your data. Read our policies to understand how we handle your information.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Tarech</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, Tarech is a pan-African AI research organization with teams in Kenya, Nigeria, South Africa, and Rwanda. 
                Our mission is to ensure that African voices, needs, and contexts are represented in the global AI revolution.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We bring together researchers, engineers, and domain experts to solve pressing challenges using responsible AI.
              </p>
              <div className="flex items-center space-x-6">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">50+ Researchers across Africa</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Ethical AI development that respects human rights</span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Open and transparent research practices</span>
                </li>
                <li className="flex items-start">
                  <Database className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span className="text-gray-600">Data sovereignty and African data ownership</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with All Required Links */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Tarech</span>
              </div>
              <p className="text-gray-400 text-sm">
                Advancing African AI Research
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white">Publications</Link></li>
                <li><Link href="#" className="hover:text-white">Datasets</Link></li>
                <li><Link href="#" className="hover:text-white">Open Source</Link></li>
                <li><Link href="#" className="hover:text-white">Collaborate</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white flex items-center">
                    <span>Privacy Policy</span>
                    <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded">Updated</span>
                  </Link>
                </li>
                <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Research Ethics</Link></li>
                <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contact@tarech.org</li>
                <li>privacy@tarech.org</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Tarech. All rights reserved. Tarech is a registered trademark.</p>
            <p className="mt-2">
              <Link href="/privacy-policy" className="hover:text-white underline">Privacy Policy</Link>
              {' · '}
              <Link href="/terms-of-service" className="hover:text-white underline">Terms of Service</Link>
              {' · '}
              <a href="https://mybusiness.tarech.org" className="hover:text-white underline">Business Suite</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;