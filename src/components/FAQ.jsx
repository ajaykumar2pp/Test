import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the ATS score?",
    answer:
      "Our AI analyzes your resume using ATS-inspired algorithms commonly used by recruiters. While no ATS system is identical, the score provides a highly reliable indication of resume compatibility.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Currently, we support PDF and DOCX resume uploads. Additional formats may be added in future updates.",
  },
  {
    question: "Can I download reports?",
    answer:
      "Yes. Pro users can download detailed PDF reports including ATS score breakdowns, keyword analysis, strengths, weaknesses, and AI recommendations.",
  },
  {
    question: "Is my resume data secure?",
    answer:
      "Absolutely. All uploaded resumes are processed securely and encrypted during transmission. We never sell or share your personal information.",
  },
  {
    question: "How many analyses can I run?",
    answer:
      "Free users receive 3 analyses per month. Pro users enjoy unlimited resume analyses and advanced AI insights.",
  },
  {
    question: "Can I analyze resumes for different jobs?",
    answer:
      "Yes. You can upload the same resume and compare it against multiple job descriptions to optimize for different positions.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-24"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Frequently Asked
            <span className="text-indigo-600"> Questions</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Everything you need to know about ResumeAnalyzer,
            ATS scoring, reports, and account limits.
          </p>

        </div>

        {/* FAQ Card */}
        <div className="mx-auto mt-16 max-w-4xl">

          <div className="rounded-3xl border bg-white p-4 shadow-sm md:p-8">

            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b last:border-none"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">

          <p className="text-slate-600">
            Still have questions?
          </p>

          <button
            className="
              mt-4
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-indigo-700
            "
          >
            Contact Support
          </button>

        </div>

      </div>
    </section>
  );
}