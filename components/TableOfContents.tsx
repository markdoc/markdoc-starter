import React, { use } from 'react';
import Link from 'next/link';

export function TableOfContents({ toc }) {

  const [inView, setInView] = React.useState(0);
  const items = toc.filter(
    (item) => item.id && (item.level === 2 || item.level === 3)
  );



  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  React.useEffect(() => {
    const main = document.querySelector('main')
    main.addEventListener('scroll', () => {
      items.forEach((item, index) => {
        const el = document.getElementById(item.id);
        if (el && isInViewport(el)) {
          setInView(index);
        }
      });
    });
  }, []);
  if (items.length <= 1) {
    return null;
  }
  return (
    <nav className="toc">
      <ul className="flex column">
        {items.map((item, i) => {
          const href = `#${item.id}`;
          const active =
            typeof window !== 'undefined' && window.location.hash === href;
          return (
            <li
              key={item.title}
              className={[
                active ? 'active' : undefined,
                item.level === 3 ? 'padded' : undefined,
                inView === i ? 'inView' : undefined
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Link href={href}>
                {item.title}
              </Link>
              
            </li>
          );
        })}
      </ul>
      <style jsx>
        {`
          nav {
            position: sticky;
            top: calc(2.5rem + var(--top-nav-height));
            max-height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            align-self: flex-start;
            margin-bottom: 1rem;
            padding: 0.5rem 0 0;
            border-left: 1px solid var(--border-color);
          }
          ul {
            margin: 0;
            padding: 0 1.5rem;
          }
          li.inView > :global(a) {
            color: blue !important;
          }
          li {
            list-style-type: none;
            margin: 0 0 1rem;
          }
          li :global(a) {
            text-decoration: none;
          }
          li :global(a:hover),
          li.active :global(a) {
            text-decoration: underline;
          }
          li.padded {
            padding-left: 1rem;
          }
        `}
      </style>
    </nav>
  );
}
