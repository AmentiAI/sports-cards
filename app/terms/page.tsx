import Header from '@/components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-8">
              <span className="gradient-text">Terms and Conditions</span>
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    By accessing and using this website, you accept and agree to be bound by 
                    the terms and provision of this agreement. If you do not agree to abide 
                    by the above, please do not use this service.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Description of Service</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Vintage 90s Sports Cards is a marketplace for authentic sports cards from 
                    the 1990s era. We specialize in:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Baseball cards from the 90s</li>
                    <li>Football cards from the 90s</li>
                    <li>Basketball cards from the 90s</li>
                    <li>Professionally graded and authenticated cards</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Purchases and Payment</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    All purchases are subject to availability and our acceptance of your order. 
                    We reserve the right to refuse or cancel your order at any time for certain 
                    reasons including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Product availability</li>
                    <li>Errors in the description or price of the product</li>
                    <li>Errors in your order</li>
                    <li>Suspected fraudulent activity</li>
                  </ul>
                  <p>
                    Payment must be received before shipment. We accept major credit cards, 
                    PayPal, and bank transfers. All prices are in USD and are subject to change 
                    without notice.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Shipping and Delivery</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We ship worldwide using insured, trackable methods. Shipping costs are 
                    calculated at checkout and vary by destination and shipping method selected.
                  </p>
                  <p>
                    Delivery times are estimates and may vary due to factors beyond our control. 
                    We are not responsible for delays caused by shipping carriers or customs.
                  </p>
                  <p>
                    All cards are shipped in protective packaging to ensure safe delivery. 
                    High-value cards may require signature confirmation upon delivery.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Returns and Refunds</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We offer a 14-day return policy for unopened items in original condition. 
                    Returns must be initiated within 14 days of delivery.
                  </p>
                  <p>
                    Refunds will be processed within 5-7 business days after we receive and 
                    inspect the returned item. Original shipping costs are non-refundable.
                  </p>
                  <p>
                    Custom or personalized items, as well as items that have been used or 
                    damaged by the customer, are not eligible for return.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Authenticity and Grading</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We guarantee the authenticity of all cards sold. All cards are carefully 
                    inspected and authenticated by our team of experts.
                  </p>
                  <p>
                    Professional grading information, when available, is provided for each card. 
                    We are not responsible for any disputes regarding card grading or condition 
                    assessments made by third-party grading services.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    In no event shall Vintage 90s Sports Cards, its officers, directors, 
                    employees, or agents be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including without limitation, loss of 
                    profits, data, use, goodwill, or other intangible losses, resulting from 
                    your use of the service.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    The content, organization, graphics, design, compilation, magnetic translation, 
                    digital conversion, and other matters related to the site are protected under 
                    applicable copyrights, trademarks, and other proprietary rights.
                  </p>
                  <p>
                    The copying, redistribution, use, or publication by you of any such matters 
                    or any part of the site is strictly prohibited.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    These terms and conditions are governed by and construed in accordance with 
                    the laws of the State of [Your State] and you irrevocably submit to the 
                    exclusive jurisdiction of the courts in that state or location.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Email:</strong> legal@vintage90scards.com</p>
                    <p><strong>Address:</strong> 123 Sports Card Lane, Collectors City, CC 12345</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We reserve the right to modify these terms at any time. We will notify 
                    users of any material changes by posting the new terms on this page and 
                    updating the "Last updated" date.
                  </p>
                  <p>
                    Your continued use of the service after any such changes constitutes your 
                    acceptance of the new terms.
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
