// components/legal/PrivacyPolicy.jsx
import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-blue">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: February 27, 2026</p>

      <p>Tarech ("we", "us", "our") is an African AI and technology research company committed to protecting your personal data in compliance with applicable data protection laws across African jurisdictions, including the Kenya Data Protection Act, 2019, South Africa's Protection of Personal Information Act (POPIA), and other relevant regulations.</p>

      <p>This Privacy Policy explains how we collect, use, disclose, store, and protect your personal information when you interact with our website, research platforms, AI tools, and services.</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Identity & Contact Data</strong>: full name, organization/affiliation, professional title, email address, phone number, country of residence.</li>
        <li><strong>Research & Usage Data</strong>: research interests, interaction with our AI tools, datasets accessed, queries submitted to our platforms, research outputs.</li>
        <li><strong>Account Data</strong>: username, password (encrypted), authentication tokens, API usage logs.</li>
        <li><strong>Technical Data</strong>: IP address, browser type, device information, operating system, website usage (cookies, logs).</li>
        <li><strong>Communication Data</strong>: emails, support inquiries, feedback, collaboration requests.</li>
        <li><strong>Event Data</strong>: registration information for webinars, conferences, and research workshops.</li>
      </ul>

      <h2>2. How We Collect Your Data</h2>
      <ul>
        <li>Directly from you (account registration, research collaboration forms, event sign-ups, emails).</li>
        <li>Automatically (cookies, server logs, analytics tools, AI model interaction logs).</li>
        <li>From third parties (research partners, academic institutions, conference organizers — with your consent).</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>To provide access to our AI research platforms and tools.</li>
        <li>To advance African AI research through anonymized usage patterns and research insights.</li>
        <li>To verify identity and credentials for research collaboration.</li>
        <li>To send research updates, newsletters, and event invitations (with consent).</li>
        <li>To improve our AI models, algorithms, and research tools.</li>
        <li>To comply with legal obligations and research ethics requirements.</li>
        <li>To prevent unauthorized access, fraud, or misuse of our research platforms.</li>
        <li>To analyze research trends and contributions across the African AI ecosystem.</li>
      </ul>

      <h2>4. Legal Basis</h2>
      <p>We process your data based on:</p>
      <ul>
        <li><strong>Legitimate interests</strong> (advancing AI research, improving our tools, fraud prevention)</li>
        <li><strong>Performance of a contract</strong> (research collaboration agreements)</li>
        <li><strong>Legal obligation</strong> (compliance with applicable laws and research ethics)</li>
        <li><strong>Your consent</strong> (marketing communications, research participation — you can opt out anytime)</li>
        <li><strong>Public interest</strong> (advancing AI research for African development)</li>
      </ul>

      <h2>5. Sharing Your Data</h2>
      <p>We may share your data with:</p>
      <ul>
        <li><strong>Research Partners</strong>: Academic institutions, research organizations (under strict confidentiality and ethics protocols)</li>
        <li><strong>Service Providers</strong>: Cloud infrastructure, analytics providers, IT services (under strict data processing agreements)</li>
        <li><strong>Authorities</strong>: When required by law or to protect our legal rights</li>
        <li><strong>Conference/Event Partners</strong>: When you register for co-hosted events (with your consent)</li>
      </ul>
      <p>We do not sell your personal data. We may share anonymized research data to advance African AI innovation.</p>

      <h2>6. Data Retention</h2>
      <p>We retain your data only as long as necessary:</p>
      <ul>
        <li><strong>Account Information</strong>: Until account deletion or 3 years of inactivity</li>
        <li><strong>Research Data</strong>: Anonymized research data may be retained indefinitely for research integrity</li>
        <li><strong>Marketing Consents</strong>: Until you withdraw consent</li>
        <li><strong>Communication Records</strong>: 3 years from last interaction</li>
        <li><strong>API/Usage Logs</strong>: 12 months for security and improvement purposes</li>
      </ul>

      <h2>7. Your Rights (Under Applicable African Data Protection Laws)</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion (subject to legal/research integrity obligations)</li>
        <li>Object to processing</li>
        <li>Withdraw consent (where processing is consent-based)</li>
        <li>Data portability</li>
        <li>Lodge a complaint with your local data protection authority</li>
      </ul>
      <p>Contact our Data Protection Officer to exercise these rights: dpo@tarech.org</p>

      <h2>8. Data Security</h2>
      <p>We implement robust technical and organizational measures to protect your data:</p>
      <ul>
        <li>End-to-end encryption for sensitive data</li>
        <li>Regular security audits and penetration testing</li>
        <li>Strict access controls and authentication requirements</li>
        <li>Employee training on data protection</li>
        <li>Secure development practices for our AI platforms</li>
      </ul>

      <h2>9. International Data Transfers</h2>
      <p>As an African research organization, we primarily store data within Africa. Where we use global service providers, we ensure:</p>
      <ul>
        <li>Adequate data protection safeguards (standard contractual clauses)</li>
        <li>Compliance with African data sovereignty principles</li>
        <li>Transparency about data locations</li>
      </ul>

      <h2>10. Cookies & Tracking</h2>
      <p>Our website uses cookies for essential functions, analytics, and to improve your research experience. You can manage preferences via our cookie banner. We respect Do Not Track signals.</p>

      <h2>11. Google User Data (For Google OAuth Users)</h2>
      <p>When you sign in using Google OAuth to access Tarech research platforms, we collect:</p>
      <ul>
        <li><strong>Basic profile information:</strong> Your name, email address, and profile picture (if provided by Google)</li>
        <li><strong>Authentication tokens:</strong> Secure tokens provided by Google to authenticate your account</li>
      </ul>

      <h3>How We Use Google User Data:</h3>
      <ul>
        <li>To create and manage your Tarech researcher account</li>
        <li>To authenticate your identity for secure platform access</li>
        <li>To personalize your research experience</li>
        <li>To send important service notifications and research updates</li>
        <li>To facilitate collaboration with research partners (with your consent)</li>
      </ul>

      <h3>Data Storage & Sharing:</h3>
      <ul>
        <li>We store your Google profile information securely in our African-based data infrastructure where possible</li>
        <li>We do NOT access or store your Google passwords</li>
        <li>We do NOT access your other Google services (Gmail, Drive, Calendar, etc.)</li>
        <li>We do NOT share your Google data with third parties except as described in Section 5</li>
        <li>Authentication tokens are encrypted and stored securely</li>
      </ul>

      <h3>Your Control Over Google Data:</h3>
      <ul>
        <li>You can revoke our access to your Google data at any time through your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Google Account Security settings</a></li>
        <li>Revoking access will disable Google login, but you can maintain your Tarech account with your email and alternative authentication</li>
      </ul>

      <h2>12. AI Research & Data Usage</h2>
      <p>As an AI research company, we may:</p>
      <ul>
        <li>Use anonymized interaction data to improve our AI models</li>
        <li>Analyze research patterns to identify trends in African AI development</li>
        <li>Contribute to open research while protecting individual privacy</li>
        <li>Never use personal data to train models without appropriate safeguards and anonymization</li>
      </ul>
      <p>For questions about our AI research data practices, contact: research-ethics@tarech.org</p>

      <h2>13. Third-Party Services</h2>
      <p>We use the following third-party services that may process your data:</p>
      <ul>
        <li><strong>Google OAuth:</strong> For user authentication (collected data: email, name, profile picture)</li>
        <li><strong>Cloud Infrastructure:</strong> African and global cloud providers (collected data: all data stored in our platforms)</li>
        <li><strong>Analytics:</strong> Privacy-focused analytics tools (collected data: anonymized usage data)</li>
        <li><strong>Communication:</strong> Email services for research updates and newsletters (with consent)</li>
        <li><strong>Research Collaboration Tools:</strong> For managing research projects and partnerships</li>
      </ul>
      <p>Each service provider has their own privacy policy governing data handling, and we ensure they meet our data protection standards.</p>

      <h2>14. African AI Research Commitment</h2>
      <p>Tarech is committed to:</p>
      <ul>
        <li>Advancing AI research that benefits African communities</li>
        <li>Protecting the privacy and rights of African researchers and users</li>
        <li>Promoting data sovereignty and local infrastructure development</li>
        <li>Ethical AI development that respects human rights and dignity</li>
        <li>Transparency in how we collect, use, and protect data</li>
      </ul>

      <h2>15. Changes to this Policy</h2>
      <p>We may update this Privacy Policy to reflect changes in our practices, technologies, or legal requirements. Changes will be posted here with an updated effective date. Material changes will be notified via email or platform notice.</p>

      <h2>16. Contact Information</h2>
      <p><strong>Data Protection Officer:</strong> dpo@tarech.org</p>
      <p><strong>Research Ethics Committee:</strong> ethics@tarech.org</p>
      <p><strong>General Privacy Inquiries:</strong> privacy@tarech.org</p>
      <p><strong>Google API Compliance:</strong> google-compliance@tarech.org</p>
      <p><strong>Address:</strong> Tarech, [City, Country, Africa]</p>
      <p><strong>Website:</strong> <a href="https://tarech.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">tarech.org</a></p>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* In your Footer.jsx or Layout.jsx */}
      <footer className="py-6 border-t mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Tarech. Advancing African AI Research.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
            <Link href="/research-ethics" className="hover:underline">Research Ethics</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;