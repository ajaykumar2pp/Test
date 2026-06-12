"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    // { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <span className="text-xl font-bold text-slate-900">Resume</span>
            <span className="text-xl font-bold text-indigo-600">Analyzer</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">Login</Button>
          </Link>
 
          <Link href="/register">
            <Button className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
              Register
            </Button>
          </Link>
          {/* <Button className="bg-indigo-600 hover:bg-indigo-700">
            Get Started
          </Button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-slate-600 transition-colors hover:text-indigo-600"
                >
                  {link.name}
                </a>
              ))}

              <div className="space-y-3 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
