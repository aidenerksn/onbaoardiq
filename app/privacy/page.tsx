import Link from "next/link"

export const metadata = {
  title: "Privacy Policy — OnboardIQ",
  description: "How OnboardIQ collects, uses, and protects your data.",
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#060d1a] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70">
          ← Back to OnboardIQ
        </Link>

        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <p className="mb-2 text-xs font-bold tracking-widest text-violet-400 uppercase">Legal</p>
          <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/40">Effective date: May 31, 2026 · Last updated: May 31, 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            OnboardIQ (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates as a <strong className="text-white/70">data processor</strong> on behalf of our customers, who are the <strong className="text-white/70">data controllers</strong>. This Privacy Policy explains how we collect, use, store, and protect information in connection with our service. It applies to visitors to our website and to end users whose data is processed through our platform on behalf of our customers.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            If you are an end user of a product that uses OnboardIQ, please contact that product&apos;s operator (our customer) for information about how they handle your personal data. Their privacy policy governs your relationship with them.
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed text-white/60">

          {/* 1 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">1. Who We Are</h2>
            <p>OnboardIQ provides behavioral analytics and automated user-rescue software for SaaS companies. Our registered business contact for privacy matters is:</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-white/50">
              <p><strong className="text-white/70">OnboardIQ</strong></p>
              <p>Email: <a href="mailto:privacy@onboardiq.com" className="text-violet-400 hover:underline">privacy@onboardiq.com</a></p>
              <p>Website: <a href="https://onboardiq.com" className="text-violet-400 hover:underline">onboardiq.com</a></p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">2. Data We Collect</h2>
            <p className="mb-4">We collect two categories of data: data about our <strong className="text-white/70">customers</strong> (companies that sign up for OnboardIQ) and data about <strong className="text-white/70">end users</strong> (individuals who use our customers&apos; products).</p>

            <h3 className="mb-3 text-base font-semibold text-white/80">2a. Customer Data</h3>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li>Name and email address (for account creation and billing)</li>
              <li>Payment information (processed by Stripe — we do not store card numbers)</li>
              <li>Company name, subscription plan, and billing history</li>
              <li>API keys and snippet keys for integration</li>
              <li>Support communications</li>
            </ul>

            <h3 className="mb-3 text-base font-semibold text-white/80">2b. End User Behavioral Data (processed on behalf of customers)</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>Session identifiers (anonymous, randomly generated — not linked to identity by us)</li>
              <li>Page URLs visited and timestamps</li>
              <li>Click events, rage-click events, and form interaction events</li>
              <li>Time-on-page and session duration</li>
              <li>Behavioral score (0–100) computed from the above signals</li>
              <li>IP address (used for geolocation at country level, then discarded)</li>
              <li>Browser type and operating system (user-agent string)</li>
            </ul>
            <p className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-white/50">
              <strong className="text-violet-300">Important:</strong> We do not collect names, email addresses, or any personally identifying information about end users unless our customer explicitly passes that data to us via our API. We do not correlate session data with identities.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">3. How We Use Data</h2>
            <h3 className="mb-3 text-base font-semibold text-white/80">Customer Data</h3>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li>To provide, maintain, and improve the OnboardIQ service</li>
              <li>To process payments and manage subscriptions</li>
              <li>To send transactional emails (receipts, alerts, account notices)</li>
              <li>To respond to support requests</li>
              <li>To comply with legal obligations</li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-white/80">End User Data (on behalf of customers)</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>To compute behavioral scores and identify at-risk sessions</li>
              <li>To populate funnel analytics in the customer dashboard</li>
              <li>To trigger automated rescue emails on the customer&apos;s behalf</li>
              <li>To improve our scoring algorithms (in aggregated, non-identifiable form only)</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">4. Legal Basis for Processing (GDPR)</h2>
            <p className="mb-4">For customers and website visitors in the European Economic Area (EEA) or United Kingdom, our legal bases for processing personal data are:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Contract performance</strong> — processing necessary to deliver the service you signed up for</li>
              <li><strong className="text-white/70">Legitimate interests</strong> — improving service quality, fraud prevention, and security (where not overridden by your rights)</li>
              <li><strong className="text-white/70">Legal obligation</strong> — where we are required to process data by law</li>
              <li><strong className="text-white/70">Consent</strong> — for cookies and marketing communications, where required</li>
            </ul>
            <p className="mt-4">For end user behavioral data, we process as a data processor under the documented instructions of our customers (the controllers), pursuant to our <Link href="/dpa" className="text-violet-400 hover:underline">Data Processing Agreement</Link>.</p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">5. Data Retention</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Customer account data:</strong> Retained for the duration of the subscription plus 90 days after cancellation, then deleted unless a longer period is required by law</li>
              <li><strong className="text-white/70">End user session data:</strong> Retained for 90 days by default; customers may request shorter retention periods</li>
              <li><strong className="text-white/70">Billing records:</strong> Retained for 7 years to comply with financial regulations</li>
              <li><strong className="text-white/70">Support communications:</strong> Retained for 2 years</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">6. Cookies</h2>
            <p className="mb-4">Our website uses the following cookies:</p>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead className="bg-white/[0.04]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Cookie</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr><td className="px-4 py-3 font-mono text-white/50">sb-auth-token</td><td className="px-4 py-3 text-white/40">Authentication session (Supabase)</td><td className="px-4 py-3 text-white/40">Session</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-white/50">stripe_*</td><td className="px-4 py-3 text-white/40">Fraud prevention (Stripe)</td><td className="px-4 py-3 text-white/40">30 days</td></tr>
                  <tr><td className="px-4 py-3 font-mono text-white/50">oiq_session</td><td className="px-4 py-3 text-white/40">Anonymous session tracking for our own analytics</td><td className="px-4 py-3 text-white/40">90 days</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">We do not use advertising or cross-site tracking cookies. You may disable cookies in your browser settings; doing so may affect certain features of the service.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">7. Third-Party Processors</h2>
            <p className="mb-4">We share data with the following sub-processors, each bound by appropriate data protection agreements:</p>
            <div className="space-y-4">
              {[
                { name: "Supabase Inc.", role: "Database hosting and authentication", location: "United States", link: "https://supabase.com/privacy" },
                { name: "Stripe Inc.", role: "Payment processing and subscription management", location: "United States", link: "https://stripe.com/privacy" },
                { name: "Resend Inc.", role: "Transactional email delivery", location: "United States", link: "https://resend.com/privacy" },
                { name: "Vercel Inc.", role: "Application hosting and edge network", location: "United States", link: "https://vercel.com/legal/privacy-policy" },
              ].map((p) => (
                <div key={p.name} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="font-semibold text-white/80">{p.name}</p>
                  <p className="text-white/40">{p.role} · {p.location}</p>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">{p.link}</a>
                </div>
              ))}
            </div>
            <p className="mt-4">All processors who receive data from EEA/UK data subjects are either located in an adequacy country or covered by Standard Contractual Clauses (SCCs).</p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">8. International Data Transfers</h2>
            <p>Our servers and processors are primarily located in the United States. If you are in the EEA or UK, your data is transferred to the US under the EU-US Data Privacy Framework and/or Standard Contractual Clauses (SCCs) pursuant to GDPR Article 46. You may request a copy of applicable SCCs by contacting us at <a href="mailto:privacy@onboardiq.com" className="text-violet-400 hover:underline">privacy@onboardiq.com</a>.</p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">9. Your Rights</h2>
            <h3 className="mb-3 text-base font-semibold text-white/80">Under GDPR (EEA / UK residents)</h3>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Access:</strong> Request a copy of personal data we hold about you</li>
              <li><strong className="text-white/70">Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong className="text-white/70">Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong className="text-white/70">Restriction:</strong> Ask us to pause processing in certain circumstances</li>
              <li><strong className="text-white/70">Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong className="text-white/70">Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong className="text-white/70">Withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
              <li><strong className="text-white/70">Lodge a complaint:</strong> With your local supervisory authority (e.g., the ICO in the UK or your EU member state&apos;s authority)</li>
            </ul>
            <h3 className="mb-3 text-base font-semibold text-white/80">Under CCPA (California residents)</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Right to know:</strong> What personal information we collect, use, and disclose</li>
              <li><strong className="text-white/70">Right to delete:</strong> Request deletion of your personal information</li>
              <li><strong className="text-white/70">Right to opt out of sale:</strong> We do <em>not</em> sell personal information</li>
              <li><strong className="text-white/70">Right to non-discrimination:</strong> We will not discriminate against you for exercising your rights</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:privacy@onboardiq.com" className="text-violet-400 hover:underline">privacy@onboardiq.com</a>. We will respond within 30 days (GDPR) or 45 days (CCPA).</p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">10. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. These include row-level security (RLS) in our database, encryption at rest and in transit (TLS 1.2+), API key authentication, and access controls limiting employee access to personal data. No transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">11. Children&apos;s Privacy</h2>
            <p>OnboardIQ is not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will delete it.</p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify customers by email or by posting a notice in the dashboard at least 30 days before the changes take effect. Continued use of the service after that date constitutes acceptance of the updated policy.</p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">13. Contact</h2>
            <p>For privacy-related questions, data subject requests, or to report a concern:</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p>Email: <a href="mailto:privacy@onboardiq.com" className="text-violet-400 hover:underline">privacy@onboardiq.com</a></p>
              <p className="mt-1 text-white/40 text-xs">We aim to respond to all privacy requests within 5 business days.</p>
            </div>
          </section>

        </div>

        {/* Footer nav */}
        <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm text-white/30">
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          <Link href="/dpa" className="hover:text-white/60 transition-colors">Data Processing Agreement</Link>
          <Link href="/" className="hover:text-white/60 transition-colors">Back to home</Link>
        </div>
      </div>
    </main>
  )
}
