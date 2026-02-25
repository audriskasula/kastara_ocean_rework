/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 py-12 mt-20 px-8 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-300">

          <div>
            <Link href="/">
              <img src="/logo.png" alt="Logo" width={120} className="rounded-xl mb-4" />
            </Link>
            <h3 className="text-lg font-semibold text-white mb-3">About Us</h3>
            <p className="text-sm leading-relaxed">
              Heaven fruitful doesn’t over lesser days <br />
              appear creeping seasons so behold <br />
              bearing days open.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
            <p className="text-sm leading-relaxed">
              Address: Your address goes here, <br />
              demo address, Bangladesh.
            </p>
            <p className="mt-3 text-sm">Phone: -</p>
            <p className="text-sm">info@domain.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Important Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/">Insurance Plans</Link></li>
              <li><Link href="/">Consultation</Link></li>
              <li><Link href="/">Customer Support</Link></li>
              <li><Link href="/">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
            <p className="text-sm mb-4 leading-relaxed">
              Heaven fruitful doesn’t over lesser in days. <br />
              Appear creeping seasons deve behold <br />
              bearing days open.
            </p>
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none"
              />
              <button className="bg-blue-500 text-white px-4 py-2">
                ➤
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm mt-12 border-t border-gray-700 pt-6">
          <p>
            Copyright ©2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
