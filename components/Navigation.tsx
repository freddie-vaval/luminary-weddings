"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/" className="logo">
        LUMINARY <span>WEDDINGS</span>
      </Link>

      <ul>
        <li>
          <Link href="/planners">Our Planners</Link>
        </li>
        <li>
          <Link href="/how-it-works">How It Works</Link>
        </li>
        <li>
          <Link href="/for-planners">For Planners</Link>
        </li>
      </ul>

      <a href="#enquiry" className="nav-cta">
        Start Your Journey
      </a>
    </nav>
  );
}