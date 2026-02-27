// components/legal/TermsOfService.jsx
import React from 'react';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-blue">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: February 27, 2026</p>

      <p>Welcome to Tarech. These Terms of Service ("Terms") govern your access to and use of our AI research platforms, websites, APIs, research tools, datasets, and related services (collectively, the "Services") provided by Tarech ("we", "us", or "our"), an African AI and technology research company.</p>

      <p>By accessing or using our Services, including creating an account, contributing to research, or using our AI tools, you agree to be bound by these Terms. If you do not agree, do not use our Services.</p>

      <h2>1. Eligibility & Account Registration</h2>
      <ul>
        <li>You must be at least 18 years old to use our Services.</li>
        <li>If you are accessing Services on behalf of an organization, you represent that you have authority to bind that organization.</li>
        <li>You agree to provide accurate, current, and complete information during registration.</li>
        <li>You are responsible for safeguarding your account credentials and all activities under your account.</li>
        <li>Notify us immediately at security@tarech.org of any unauthorized account use.</li>
        <li>We reserve the right to refuse service, terminate accounts, or remove content at our discretion.</li>
      </ul>

      <h2>2. Research & AI Services</h2>
      <h3>2.1 Access to Research Tools</h3>
      <ul>
        <li>Our AI research platforms and tools are provided for legitimate research, educational, and development purposes.</li>
        <li>Access to certain datasets or advanced features may require additional verification or institutional affiliation.</li>
        <li>We may impose usage limits or throttling to ensure fair access and system stability.</li>
        <li>API access is governed by additional API Terms available upon request.</li>
      </ul>

      <h3>2.2 Research Contributions</h3>
      <ul>
        <li>By contributing research, datasets, or feedback to our platforms, you grant Tarech a non-exclusive, worldwide, royalty-free license to use, analyze, and build upon your contributions for research purposes.</li>
        <li>You represent that you have all necessary rights to any content you contribute.</li>
        <li>We respect intellectual property rights — if you believe your work has been used improperly, contact ip@tarech.org.</li>
        <li>Contributions may be used to improve AI models, but will be anonymized where appropriate.</li>
      </ul>

      <h3>2.3 AI Outputs & Results</h3>
      <ul>
        <li>AI-generated outputs are provided "as is" for research and informational purposes only.</li>
        <li>We do not guarantee accuracy, completeness, or reliability of AI outputs.</li>
        <li>You are responsible for evaluating and validating any outputs before use in decision-making.</li>
        <li>AI models may reflect biases present in training data — we actively work to identify and mitigate such biases.</li>
      </ul>

      <h2>3. Acceptable Use Policy</h2>
      <p>You agree NOT to use our Services to:</p>
      <ul>
        <li>Violate any applicable laws or regulations in any African jurisdiction or your location.</li>
        <li>Infringe upon intellectual property rights of others.</li>
        <li>Distribute malware, viruses, or harmful code.</li>
        <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
        <li>Reverse engineer, decompile, or extract source code from our platforms (except as permitted by open-source licenses).</li>
        <li>Use AI outputs to create harmful or deceptive content, including deepfakes or misinformation.</li>
        <li>Engage in any activity that could harm minors or vulnerable populations.</li>
        <li>Scrape or collect user data without explicit permission.</li>
        <li>Use our Services for military, surveillance, or weapons development.</li>
        <li>Develop AI systems that could violate human rights or fundamental freedoms.</li>
      </ul>

      <h2>4. Intellectual Property Rights</h2>
      <h3>4.1 Tarech Property</h3>
      <ul>
        <li>Our Services, including software, algorithms, research methodologies, datasets (except third-party data), and trademarks, are owned by Tarech or our licensors.</li>
        <li>You may not copy, modify, distribute, sell, or lease any part of our Services without written permission.</li>
        <li>Certain components may be open-source — their use is governed by respective licenses.</li>
      </ul>

      <h3>4.2 User Content</h3>
      <ul>
        <li>You retain ownership of any content, research, or data you submit (excluding anonymized contributions for model training).</li>
        <li>By submitting content, you grant us permission to host, store, and process it as necessary to provide Services.</li>
        <li>For research publications or case studies, we will seek consent before attributing work to you or your organization.</li>
      </ul>

      <h2>5. Fees & Payments</h2>
      <ul>
        <li>Some Services may be free, while others require payment (e.g., premium API access, enterprise features).</li>
        <li>Paid services are subject to additional payment terms provided at the time of purchase.</li>
        <li>Fees are non-refundable except as required by law or specified in writing.</li>
        <li>We accept payments via methods common in Africa (M-Pesa, cards, bank transfers, etc.).</li>
        <li>Prices may be quoted in local currencies or USD — final charges will be clearly displayed.</li>
      </ul>

      <h2>6. Research Ethics & Data Usage</h2>
      <ul>
        <li>We are committed to ethical AI research that benefits African communities.</li>
        <li>Your data is handled according to our Privacy Policy and applicable data protection laws.</li>
        <li>Research involving human subjects follows established ethical guidelines and IRB approval where applicable.</li>
        <li>We strive for transparency, fairness, and accountability in all our AI systems.</li>
        <li>Questions about research ethics can be directed to ethics@tarech.org.</li>
      </ul>

      <h2>7. Disclaimer of Warranties</h2>
      <p>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING:</p>
      <ul>
        <li>That Services will be uninterrupted, timely, secure, or error-free.</li>
        <li>That AI outputs will be accurate, reliable, or complete.</li>
        <li>That defects will be corrected.</li>
        <li>That Services meet your specific requirements or research needs.</li>
      </ul>
      <p>YOU USE OUR SERVICES AT YOUR OWN RISK.</p>

      <h2>8. Limitation of Liability</h2>
      <p>TO THE EXTENT PERMITTED BY LAW, TARECH AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND RESEARCHERS SHALL NOT BE LIABLE FOR:</p>
      <ul>
        <li>Indirect, incidental, special, consequential, or punitive damages.</li>
        <li>Loss of profits, data, use, goodwill, or other intangible losses.</li>
        <li>Damages resulting from your use or inability to use Services.</li>
        <li>Any conduct or content of third parties.</li>
        <li>Unauthorized access to or alteration of your transmissions or data.</li>
      </ul>
      <p>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US (IF ANY) IN THE PAST 12 MONTHS.</p>

      <h2>9. Indemnification</h2>
      <p>You agree to indemnify and hold harmless Tarech, its researchers, affiliates, and partners from any claims, damages, liabilities, and expenses arising from:</p>
      <ul>
        <li>Your use of our Services.</li>
        <li>Your violation of these Terms.</li>
        <li>Your violation of any third-party rights.</li>
        <li>Your contributions or research outputs.</li>
      </ul>

      <h2>10. Termination</h2>
      <ul>
        <li><strong>By You:</strong> You may stop using Services anytime. Account deletion requests can be sent to support@tarech.org.</li>
        <li><strong>By Us:</strong> We may suspend or terminate your access immediately without notice if you breach these Terms, misuse our Services, or pose a security risk.</li>
        <li>Sections that should survive termination will survive (IP, liability, governing law, etc.).</li>
      </ul>

      <h2>11. Third-Party Links & Services</h2>
      <ul>
        <li>Our Services may contain links to third-party websites, datasets, or tools.</li>
        <li>We do not endorse or control third-party services and are not responsible for their content or practices.</li>
        <li>Your use of third-party services is at your own risk and subject to their terms.</li>
      </ul>

      <h2>12. Governing Law & Dispute Resolution</h2>
      <h3>12.1 Governing Law</h3>
      <p>These Terms are governed by the laws of the Republic of Kenya, without regard to conflict of law principles.</p>

      <h3>12.2 Dispute Resolution</h3>
      <ul>
        <li><strong>Informal Resolution:</strong> Before filing a claim, you agree to contact us at disputes@tarech.org to attempt informal resolution for 60 days.</li>
        <li><strong>Arbitration:</strong> If unresolved, disputes shall be settled by arbitration in Nairobi, Kenya, in accordance with the Nairobi Centre for International Arbitration (NCIA) rules.</li>
        <li><strong>Exceptions:</strong> Either party may seek injunctive relief in courts to protect intellectual property rights.</li>
        <li><strong>Class Action Waiver:</strong> Disputes shall be resolved on an individual basis, not as a class action.</li>
      </ul>

      <h2>13. Export Controls & Sanctions</h2>
      <ul>
        <li>You may not use our Services in violation of export control laws or international sanctions.</li>
        <li>You represent that you are not located in a country subject to comprehensive sanctions.</li>
        <li>Our AI tools and research outputs may not be used for prohibited purposes, including weapons development.</li>
      </ul>

      <h2>14. Modifications to Terms</h2>
      <ul>
        <li>We may update these Terms to reflect changes in our Services, legal requirements, or research practices.</li>
        <li>Material changes will be notified via email or platform notice at least 30 days in advance.</li>
        <li>Continued use after changes constitutes acceptance of updated Terms.</li>
      </ul>

      <h2>15. Severability</h2>
      <p>If any provision of these Terms is found unenforceable, the remaining provisions shall remain in full force and effect.</p>

      <h2>16. Entire Agreement</h2>
      <p>These Terms, together with our Privacy Policy and any specific agreements (e.g., research collaboration agreements), constitute the entire agreement between you and Tarech regarding our Services.</p>

      <h2>17. Contact Information</h2>
      <p>For questions, concerns, or legal notices:</p>
      <ul>
        <li><strong>General Inquiries:</strong> support@tarech.org</li>
        <li><strong>Legal Notices:</strong> legal@tarech.org</li>
        <li><strong>Research Ethics:</strong> ethics@tarech.org</li>
        <li><strong>Intellectual Property:</strong> ip@tarech.org</li>
        <li><strong>Disputes:</strong> disputes@tarech.org</li>
        <li><strong>Address:</strong> Tarech, [City, Country, Africa]</li>
        <li><strong>Website:</strong> <a href="https://tarech.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">tarech.org</a></li>
      </ul>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">By using Tarech's Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;