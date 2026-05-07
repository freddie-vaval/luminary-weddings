import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          LUMINARY <span>WEDDINGS</span>
        </div>

        <ul className="footer-links">
          <li>
            <Link href="/planners">Our Planners</Link>
          </li>
          <li>
            <Link href="/for-planners">For Planners</Link>
          </li>
          <li>
            <Link href="/how-it-works">How It Works</Link>
          </li>
        </ul>

        <div className="footer-social">
          <a
            href="https://instagram.com/luminaryweddings"
            target="_blank"
            rel="noopener noreferrer"
          >
            @luminaryweddings ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Luminary Weddings Ltd. All rights reserved.
      </div>
    </footer>
  );
}