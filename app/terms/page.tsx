import Link from "next/link"

export const metadata = {
  title: "Terms of Service — OnboardIQ",
  description: "Terms governing your use of the OnboardIQ platform.",
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#060d1a] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70">
          ← Back to OnboardIQ
        </Link>

        <div className="mb-12 border-b border-white/10 pb-8">
          <p className="mb-2 text-xs font-bold tracking-widest text-violet-400 uppercase">Legal</p>
          <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="mt-3 text-sm text-white/40">Effective date: May 31, 2026 · Last updated: May 31, 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the OnboardIQ platform, website, and services (collectively, the &ldquo;Service&rdquo;) operated by OnboardIQ (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed text-white/60">

          {/* 1 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">1. The Service</h2>
            <p>OnboardIQ provides behavioral analytics software that allows SaaS companies (&ldquo;Customers&rdquo;) to track trial user behavior, identify at-risk sessions, and trigger automated recovery emails. The Service is provided on a subscription basis.</p>
            <p className="mt-3">We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice, except where required immediately for legal or security reasons.</p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">2. Accounts and Eligibility</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or your organization.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately at <a href="mailto:security@onboardiq.com" className="text-violet-400 hover:underline">security@onboardiq.com</a> if you suspect unauthorized access.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>One account per organization unless expressly agreed otherwise.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">3. Acceptable Use</h2>
            <p className="mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Track users without proper disclosure in your own privacy policy</li>
              <li>Collect sensitive personal data (health information, financial data, government IDs) through our tracking snippet without explicit consent</li>
              <li>Send unsolicited bulk email or spam through our rescue email system</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of our software</li>
              <li>Resell or sublicense access to the Service without our written consent</li>
              <li>Use the Service to violate any applicable law or regulation, including GDPR, CCPA, CAN-SPAM, or CASL</li>
              <li>Interfere with or disrupt the integrity or performance of the Service or third-party data</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its related systems</li>
              <li>Use the Service to track individuals in jurisdictions where behavioral tracking is prohibited without explicit consent</li>
            </ul>
            <p className="mt-4">Violation of this section may result in immediate suspension or termination of your account without refund.</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">4. Free Trial</h2>
            <p>We offer a 14-day free trial on all plans. No credit card is required to start a trial. At the end of the trial period, you must enter payment information to continue using the Service. We reserve the right to modify or discontinue free trial terms at any time.</p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">5. Payment Terms</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Billing cycle:</strong> Subscriptions are billed monthly or annually in advance, depending on the plan selected.</li>
              <li><strong className="text-white/70">Payment method:</strong> We accept major credit cards via Stripe. By providing payment information, you authorize us to charge your card on a recurring basis.</li>
              <li><strong className="text-white/70">Price changes:</strong> We will provide at least 30 days&apos; notice before increasing prices. Continued use after the effective date constitutes acceptance of the new pricing.</li>
              <li><strong className="text-white/70">Failed payments:</strong> If a payment fails, we will retry up to three times over seven days. After that, your account may be suspended until payment is resolved.</li>
              <li><strong className="text-white/70">Taxes:</strong> Prices exclude applicable sales tax, VAT, or GST. You are responsible for any taxes applicable to your purchase.</li>
              <li><strong className="text-white/70">Disputes:</strong> Billing disputes must be raised within 60 days of the charge. Contact <a href="mailto:billing@onboardiq.com" className="text-violet-400 hover:underline">billing@onboardiq.com</a>.</li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">6. Cancellation and Refunds</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Cancellation:</strong> You may cancel your subscription at any time from the billing portal in your account settings. Cancellation takes effect at the end of the current billing period.</li>
              <li><strong className="text-white/70">No partial refunds:</strong> We do not provide prorated refunds for unused time in a billing period, except where required by law.</li>
              <li><strong className="text-white/70">Annual plans:</strong> Annual subscriptions cancelled within 14 days of the start of a new annual period may be eligible for a prorated refund at our discretion. Contact <a href="mailto:billing@onboardiq.com" className="text-violet-400 hover:underline">billing@onboardiq.com</a>.</li>
              <li><strong className="text-white/70">Data after cancellation:</strong> Your data is retained for 90 days after cancellation. You may request a data export during this period. After 90 days, all data is permanently deleted.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">7. Data Ownership</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Your data is yours:</strong> All session data, behavioral events, and analytics data collected through your tracking snippet belong to you. We do not claim ownership over your data.</li>
              <li><strong className="text-white/70">License to process:</strong> You grant us a limited, non-exclusive license to process your data solely for the purpose of providing the Service.</li>
              <li><strong className="text-white/70">Aggregated data:</strong> We may use anonymized, aggregated data derived from the Service (containing no personally identifiable information) to improve our algorithms and publish general industry benchmarks.</li>
              <li><strong className="text-white/70">No data selling:</strong> We will never sell your data or your users&apos; data to third parties.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">8. Intellectual Property</h2>
            <p>The Service, including its software, design, algorithms, and documentation, is owned by OnboardIQ and protected by intellectual property laws. These Terms do not grant you any right to use our trademarks, logos, or brand assets without written permission. You may not copy, modify, or create derivative works of the Service.</p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">9. Confidentiality</h2>
            <p>Each party agrees to keep confidential any non-public information disclosed by the other party that is designated as confidential or reasonably should be understood to be confidential. This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law.</p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">10. Uptime and Service Level</h2>
            <p>We target 99.5% monthly uptime for the core Service. Scheduled maintenance will be communicated in advance where possible. We are not liable for downtime caused by third-party infrastructure, force majeure events, or circumstances beyond our reasonable control. We do not currently offer a formal SLA for standard plans; enterprise customers may negotiate SLA terms separately.</p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">11. Disclaimer of Warranties</h2>
            <p className="uppercase tracking-wide text-white/50 text-xs mb-3">Important — please read carefully</p>
            <p>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE OPERATION. WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR THAT DEFECTS WILL BE CORRECTED.</p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">12. Limitation of Liability</h2>
            <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>ONBOARDIQ&apos;S TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS ARISING UNDER OR RELATED TO THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL FEES YOU PAID TO US IN THE THREE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).</li>
              <li>WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOSS OF DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</li>
            </ul>
            <p className="mt-4">Some jurisdictions do not allow certain liability limitations. In such cases, our liability is limited to the maximum extent permitted by law.</p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">13. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless OnboardIQ and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Service in violation of these Terms; (b) your violation of any applicable law or third-party rights; or (c) your failure to obtain necessary consents from your users before deploying our tracking snippet.</p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">14. Dispute Resolution</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Informal resolution:</strong> Before filing any formal dispute, you agree to contact us at <a href="mailto:legal@onboardiq.com" className="text-violet-400 hover:underline">legal@onboardiq.com</a> and attempt to resolve the matter informally for at least 30 days.</li>
              <li><strong className="text-white/70">Governing law:</strong> These Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict of law principles.</li>
              <li><strong className="text-white/70">Arbitration:</strong> Any dispute not resolved informally shall be finally settled by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall take place in Delaware. The arbitrator&apos;s decision is final and binding.</li>
              <li><strong className="text-white/70">Class action waiver:</strong> You waive any right to participate in a class action lawsuit or class-wide arbitration against OnboardIQ.</li>
              <li><strong className="text-white/70">EU/UK customers:</strong> If you are located in the EU or UK, you may also have the right to bring claims before your local courts or use alternative dispute resolution mechanisms available in your jurisdiction.</li>
            </ul>
          </section>

          {/* 15 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">15. Termination</h2>
            <p>Either party may terminate these Terms at any time. We may suspend or terminate your access immediately if you violate these Terms, fail to pay fees, or if required by law. Upon termination, your right to use the Service ceases immediately. Sections 7 (Data Ownership), 8 (IP), 11 (Disclaimers), 12 (Liability), 13 (Indemnification), and 14 (Disputes) survive termination.</p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">16. General</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">Entire agreement:</strong> These Terms, together with the Privacy Policy and any DPA, constitute the entire agreement between you and OnboardIQ.</li>
              <li><strong className="text-white/70">Severability:</strong> If any provision is found unenforceable, the remaining provisions continue in full force.</li>
              <li><strong className="text-white/70">Waiver:</strong> Our failure to enforce any right is not a waiver of that right.</li>
              <li><strong className="text-white/70">Assignment:</strong> You may not assign these Terms without our written consent. We may assign these Terms in connection with a merger or acquisition.</li>
              <li><strong className="text-white/70">Updates:</strong> We may update these Terms at any time. Material changes will be communicated 30 days in advance. Continued use constitutes acceptance.</li>
            </ul>
          </section>

          {/* 17 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">17. Contact</h2>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p>Legal inquiries: <a href="mailto:legal@onboardiq.com" className="text-violet-400 hover:underline">legal@onboardiq.com</a></p>
              <p className="mt-1">Billing inquiries: <a href="mailto:billing@onboardiq.com" className="text-violet-400 hover:underline">billing@onboardiq.com</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/dpa" className="hover:text-white/60 transition-colors">Data Processing Agreement</Link>
          <Link href="/" className="hover:text-white/60 transition-colors">Back to home</Link>
        </div>
      </div>
    </main>
  )
}
