'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: '预测大盘' },
    { href: '/groups', label: '小组积分榜' },
    { href: '/matches', label: '赛程与评分' },
    { href: '/bracket', label: '淘汰赛对阵模拟' }
  ];

  return (
    <header className="header-nav">
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <span className="nav-logo-icon">⚽</span>
          <span>FIFA 2026 Prediction</span>
        </Link>
        <nav className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
