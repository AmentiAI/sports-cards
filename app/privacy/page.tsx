import Header from '@/components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-8">
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact us about purchasing sports cards</li>
                    <li>Submit inquiries through our website</li>
                    <li>Communicate with us via phone or email</li>
                  </ul>
                  <p>
                    This information may include your name, email address, phone number, 
                    and any other information you choose to provide.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <div className="text-slate-300 space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Respond to your inquiries about our sports cards</li>
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your purchases</li>
                    <li>Improve our website and services</li>
                    <li>Send you updates about new cards and special offers (with your consent)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information 
                    to third parties without your consent, except as described in this policy.
                  </p>
                  <p>
                    We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With service providers who assist us in operating our website</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We implement appropriate security measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    However, no method of transmission over the internet or electronic storage 
                    is 100% secure, so we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Our website may use cookies and similar tracking technologies to enhance 
                    your browsing experience and analyze website traffic.
                  </p>
                  <p>
                    You can control cookie settings through your browser preferences, 
                    though this may affect website functionality.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <div className="text-slate-300 space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Email:</strong> privacy@vintage90scards.com</p>
                    <p><strong>Address:</strong> 123 Sports Card Lane, Collectors City, CC 12345</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you 
                    of any changes by posting the new Privacy Policy on this page and updating 
                    the "Last updated" date.
                  </p>
                  <p>
                    Your continued use of our website after any changes constitutes acceptance 
                    of the updated Privacy Policy.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
