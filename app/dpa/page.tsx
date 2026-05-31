import Link from "next/link"

export const metadata = {
  title: "Data Processing Agreement — OnboardIQ",
  description: "GDPR-compliant Data Processing Agreement for OnboardIQ customers.",
}

export default function DataProcessingAgreement() {
  return (
    <main className="min-h-screen bg-[#060d1a] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70">
          ← Back to OnboardIQ
        </Link>

        <div className="mb-12 border-b border-white/10 pb-8">
          <p className="mb-2 text-xs font-bold tracking-widest text-violet-400 uppercase">Legal</p>
          <h1 className="text-4xl font-extrabold text-white">Data Processing Agreement</h1>
          <p className="mt-3 text-sm text-white/40">Effective date: May 31, 2026 · Last updated: May 31, 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of the Terms of Service between OnboardIQ (&ldquo;Processor&rdquo;) and the Customer (&ldquo;Controller&rdquo;). It governs the processing of personal data by OnboardIQ on behalf of the Customer in connection with the OnboardIQ Service, and satisfies the requirements of Article 28 of Regulation (EU) 2016/679 (GDPR) and equivalent UK data protection law.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            By accepting the Terms of Service, the Customer also accepts this DPA. For enterprise customers requiring a countersigned DPA or custom clauses, please contact <a href="mailto:legal@onboardiq.com" className="text-violet-400 hover:underline">legal@onboardiq.com</a>.
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed text-white/60">

          {/* 1 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">1. Definitions</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-white/70">&ldquo;Controller&rdquo;</strong> means the Customer — the entity that determines the purposes and means of processing personal data.</li>
              <li><strong className="text-white/70">&ldquo;Processor&rdquo;</strong> means OnboardIQ — the entity that processes personal data on behalf of the Controller.</li>
              <li><strong className="text-white/70">&ldquo;Personal Data&rdquo;</strong> means any information relating to an identified or identifiable natural person (&ldquo;Data Subject&rdquo;) that is processed by OnboardIQ in the course of providing the Service.</li>
              <li><strong className="text-white/70">&ldquo;Processing&rdquo;</strong> has the meaning given in the GDPR.</li>
              <li><strong className="text-white/70">&ldquo;Sub-processor&rdquo;</strong> means any third party engaged by OnboardIQ to process Personal Data.</li>
              <li><strong className="text-white/70">&ldquo;Data Breach&rdquo;</strong> means a breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data.</li>
              <li><strong className="text-white/70">&ldquo;SCCs&rdquo;</strong> means the Standard Contractual Clauses approved by the European Commission for international data transfers.</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">2. Processing Instructions</h2>
            <p className="mb-3">OnboardIQ shall process Personal Data only:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>On the documented instructions of the Controller, as set out in this DPA and the Terms of Service</li>
              <li>To provide and improve the Service as described in the Terms of Service</li>
              <li>As required by applicable EU or Member State law, in which case OnboardIQ shall inform the Controller before processing (unless prohibited by law)</li>
            </ul>
            <p className="mt-4">If OnboardIQ believes an instruction infringes applicable data protection law, it shall promptly notify the Controller. OnboardIQ shall not process Personal Data for its own purposes or for any purpose other than those specified in this DPA.</p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">3. Confidentiality</h2>
            <p>OnboardIQ shall ensure that all persons authorized to process Personal Data are subject to an appropriate duty of confidentiality (whether contractual or statutory). OnboardIQ shall not disclose Personal Data to any third party except as permitted under this DPA or required by law.</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">4. Security</h2>
            <p className="mb-4">Taking into account the state of the art, costs of implementation, and the nature, scope, context, and purposes of processing, OnboardIQ shall implement and maintain appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Encryption of Personal Data in transit (TLS 1.2+) and at rest (AES-256)</li>
              <li>Row-level security (RLS) ensuring strict data isolation between customers</li>
              <li>Access controls limiting employee access to Personal Data on a need-to-know basis</li>
              <li>Regular security assessments and vulnerability scanning</li>
              <li>Multi-factor authentication for internal system access</li>
              <li>Audit logging of access to systems containing Personal Data</li>
              <li>Incident response procedures including Data Breach notification</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">5. Sub-processors</h2>
            <p className="mb-4">The Controller provides a general written authorization for OnboardIQ to engage sub-processors. OnboardIQ shall:</p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Maintain and make available an up-to-date list of approved sub-processors (see Annex II)</li>
              <li>Provide at least 10 days&apos; prior written notice before adding or replacing a sub-processor</li>
              <li>Impose data protection obligations on sub-processors no less protective than those in this DPA</li>
              <li>Remain fully liable to the Controller for the acts and omissions of any sub-processor</li>
            </ul>
            <p>The Controller may object to a new sub-processor by notifying OnboardIQ within 10 days of the notice. If the parties cannot resolve the objection, the Controller may terminate the affected Services upon written notice.</p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">6. Data Subject Rights</h2>
            <p className="mb-4">OnboardIQ shall provide commercially reasonable assistance to the Controller in fulfilling its obligations to respond to Data Subject requests, including requests to access, rectify, erase, restrict, port, or object to processing of Personal Data. The Controller is responsible for responding to Data Subjects; OnboardIQ will support where technically feasible.</p>
            <p>Where a Data Subject submits a request directly to OnboardIQ, OnboardIQ shall promptly forward the request to the Controller and shall not respond independently unless directed to do so.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">7. Data Breach Notification</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>OnboardIQ shall notify the Controller without undue delay, and in any event within <strong className="text-white/70">72 hours</strong> of becoming aware of a Data Breach affecting Personal Data.</li>
              <li>The notification shall include: the nature of the breach, categories and approximate number of Data Subjects affected, categories and approximate number of records affected, likely consequences, and measures taken or proposed.</li>
              <li>OnboardIQ shall cooperate with the Controller and take such reasonable steps as are directed by the Controller to assist in investigating, mitigating, and remediating each Data Breach.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">8. Data Protection Impact Assessments</h2>
            <p>OnboardIQ shall provide reasonable assistance to the Controller for the purpose of carrying out data protection impact assessments (DPIAs) and prior consultations with supervisory authorities, taking into account the nature of processing and the information available to OnboardIQ, as required by GDPR Articles 35 and 36.</p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">9. Audit Rights</h2>
            <p>OnboardIQ shall make available to the Controller all information reasonably necessary to demonstrate compliance with this DPA. OnboardIQ shall allow for and contribute to audits or inspections conducted by the Controller or a third-party auditor appointed by the Controller, subject to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Reasonable advance notice of at least 30 days (except in the case of a Data Breach)</li>
              <li>Audits being conducted during normal business hours with minimum disruption</li>
              <li>Costs of the audit being borne by the Controller</li>
              <li>The auditor being bound by confidentiality obligations acceptable to OnboardIQ</li>
            </ul>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">10. International Data Transfers</h2>
            <p className="mb-4">Personal Data may be transferred to and processed in countries outside the EEA or UK. OnboardIQ shall ensure that any such transfer is subject to appropriate safeguards, including:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The EU-US Data Privacy Framework where applicable</li>
              <li>Standard Contractual Clauses (SCCs) as approved by the European Commission (Commission Decision 2021/914)</li>
              <li>UK International Data Transfer Agreements (IDTAs) where required</li>
            </ul>
            <p className="mt-4">By entering into this DPA, the parties are deemed to have executed the applicable SCCs with OnboardIQ as &ldquo;data importer&rdquo; and the Customer as &ldquo;data exporter.&rdquo; The SCCs are incorporated by reference and available upon request.</p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">11. Return and Deletion of Data</h2>
            <p>Upon termination of the Services or upon the Controller&apos;s written request:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>OnboardIQ shall, at the Controller&apos;s election, either return all Personal Data to the Controller in a machine-readable format or securely delete it</li>
              <li>OnboardIQ shall delete or return all Personal Data within 90 days of termination</li>
              <li>OnboardIQ shall provide written confirmation of deletion upon request</li>
              <li>OnboardIQ may retain Personal Data to the extent required by applicable law, in which case it shall inform the Controller and shall continue to protect that data</li>
            </ul>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">12. Controller Responsibilities</h2>
            <p className="mb-4">The Controller warrants and represents that:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>It has a lawful basis for processing Personal Data and for instructing OnboardIQ to process it</li>
              <li>It has provided appropriate notices and, where required, obtained valid consent from Data Subjects before deploying OnboardIQ&apos;s tracking snippet</li>
              <li>It has disclosed OnboardIQ as a data processor in its privacy policy</li>
              <li>Its instructions to OnboardIQ comply with all applicable data protection laws</li>
            </ul>
          </section>

          {/* Annex I */}
          <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Annex I — Description of Processing</h2>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-white/80">Subject matter</p>
                <p>Behavioral analytics and automated user recovery for SaaS trial users</p>
              </div>
              <div>
                <p className="font-semibold text-white/80">Duration</p>
                <p>For the term of the Customer&apos;s subscription, plus 90 days post-termination</p>
              </div>
              <div>
                <p className="font-semibold text-white/80">Nature and purpose of processing</p>
                <p>Collection and analysis of end-user behavioral events; computation of risk scores; triggering of automated re-engagement emails; provision of analytics dashboards</p>
              </div>
              <div>
                <p className="font-semibold text-white/80">Types of Personal Data</p>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>Anonymous session identifiers</li>
                  <li>Page URLs and navigation events</li>
                  <li>Click, rage-click, and form interaction events</li>
                  <li>IP address (country-level geolocation only)</li>
                  <li>Browser and OS metadata (user-agent)</li>
                  <li>Email address (only if Customer passes this via API)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white/80">Categories of Data Subjects</p>
                <p>Trial users and registered users of the Controller&apos;s SaaS product</p>
              </div>
            </div>
          </section>

          {/* Annex II */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Annex II — Approved Sub-processors</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead className="bg-white/[0.04]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Sub-processor</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Service</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Location</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/70">Transfer mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr>
                    <td className="px-4 py-3 font-medium text-white/70">Supabase Inc.</td>
                    <td className="px-4 py-3 text-white/40">Database hosting &amp; auth</td>
                    <td className="px-4 py-3 text-white/40">US</td>
                    <td className="px-4 py-3 text-white/40">SCCs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white/70">Stripe Inc.</td>
                    <td className="px-4 py-3 text-white/40">Payment processing</td>
                    <td className="px-4 py-3 text-white/40">US</td>
                    <td className="px-4 py-3 text-white/40">DPF / SCCs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white/70">Resend Inc.</td>
                    <td className="px-4 py-3 text-white/40">Transactional email</td>
                    <td className="px-4 py-3 text-white/40">US</td>
                    <td className="px-4 py-3 text-white/40">SCCs</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-white/70">Vercel Inc.</td>
                    <td className="px-4 py-3 text-white/40">App hosting &amp; CDN</td>
                    <td className="px-4 py-3 text-white/40">US / Global</td>
                    <td className="px-4 py-3 text-white/40">SCCs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Annex III */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Annex III — Technical and Organizational Measures</h2>
            <div className="space-y-3">
              {[
                { title: "Encryption", detail: "All data encrypted in transit via TLS 1.2+ and at rest via AES-256" },
                { title: "Access control", detail: "Role-based access; row-level security (RLS) isolates each customer's data; MFA required for privileged access" },
                { title: "Data isolation", detail: "Strict logical separation of customer data via customer_id scoping and RLS policies" },
                { title: "Audit logging", detail: "All access to production systems and personal data is logged and retained for 12 months" },
                { title: "Vulnerability management", detail: "Regular dependency scanning; security patches applied within 72 hours of critical CVE disclosure" },
                { title: "Incident response", detail: "Documented incident response plan; 72-hour breach notification commitment" },
                { title: "Data minimization", detail: "Only behavioral metadata is collected; no PII is collected unless explicitly provided by the controller" },
                { title: "Backup & recovery", detail: "Daily automated backups with point-in-time recovery; tested quarterly" },
                { title: "Employee training", detail: "All staff with access to personal data complete data protection training annually" },
              ].map((m) => (
                <div key={m.title} className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 mt-2" />
                  <div>
                    <span className="font-semibold text-white/80">{m.title}:</span>{" "}
                    <span>{m.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">Questions and Countersigned DPAs</h2>
            <p>Enterprise customers requiring a wet-signed or countersigned DPA, custom clauses, or a copy of applicable Standard Contractual Clauses should contact:</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p>Email: <a href="mailto:legal@onboardiq.com" className="text-violet-400 hover:underline">legal@onboardiq.com</a></p>
              <p className="mt-1 text-white/40 text-xs">Please include your company name and the specific requirement in your email.</p>
            </div>
          </section>

        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-white/10 pt-8 text-sm text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-white/60 transition-colors">Back to home</Link>
        </div>
      </div>
    </main>
  )
}
