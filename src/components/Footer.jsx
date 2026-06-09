import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold">
                R
              </div>

              <span className="text-xl font-bold">ResumeAnalyzer</span>
            </div>

            <p className="mt-4 max-w-sm text-slate-600">
              AI-powered resume analysis platform helping professionals improve
              ATS scores, optimize resumes, and land more interviews.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <Link
              target="_blank"
                href="https://github.com/sahibcoder/Resume-Analyzer-2026"
                className="
                  rounded-xl
                  border
                  p-2
                  text-slate-600
                  transition
                  hover:border-indigo-200
                  hover:text-indigo-600
                "
              >
                <FaGithub className="h-5 w-5" />
              </Link>

              <Link
              target="_blank"
                href="https://www.linkedin.com/in/sahib-ansari-b95045322"
                className="
                  rounded-xl
                  border
                  p-2
                  text-slate-600
                  transition
                  hover:border-indigo-200
                  hover:text-indigo-600
                "
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>


              <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=sahibcoder123@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="
    rounded-xl
    border
    p-2
    text-slate-600
    transition
    hover:border-indigo-200
    hover:text-indigo-600
  "
>
  <MdEmail className="h-5 w-5" />
</a>

              {/* <Link
                target="_blank"
                href="mailto:sahibcoder123@gmail.com"
                className="
                  rounded-xl
                  border
                  p-2
                  text-slate-600
                  transition
                  hover:border-indigo-200
                  hover:text-indigo-600
                "
              >
                <MdEmail className="h-5 w-5" />
              </Link> */}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-slate-900">Product</h3>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <Link href="#features">Features</Link>
              </li>

              <li>
                <Link href="#pricing">Pricing</Link>
              </li>

              <li>
                <Link href="#how-it-works">How It Works</Link>
              </li>

              <li>
                <Link href="#">ATS Checker</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-900">Resources</h3>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <Link href="#">Blog</Link>
              </li>

              <li>
                <Link href="#">Career Tips</Link>
              </li>

              <li>
                <Link href="#">Resume Templates</Link>
              </li>

              <li>
                <Link href="#">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900">Company</h3>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <Link href="#">About</Link>
              </li>

              <li>
                <Link href="#">Contact</Link>
              </li>

              <li>
                <Link href="#">Privacy Policy</Link>
              </li>

              <li>
                <Link href="#">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} ResumeAnalyzer. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#">Privacy</Link>

            <Link href="#">Terms</Link>

            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
