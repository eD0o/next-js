'use client';

import React from 'react';
import FeedIcon from '@/icons/feed-icon';
import StatsIcon from '@/icons/stats-icon';
import AddIcon from '@/icons/add-icon';
import LogoutIcon from '@/icons/logout-icon';
import styles from './account-header.module.scss';
import useMedia from '@/hooks/use-media';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logout from '@/actions/logout';
import { useUser } from '@/context/user-context';

function getTitle(pathname: string) {
  switch (pathname) {
    case '/account/post':
      return 'Post your photo';
    case '/account/stats':
      return 'Stats';
    default:
      return 'My account';
  }
}

export default function AccountHeader() {
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const { setUserState } = useUser()
  async function handleLogout() {
    await logout();
    setUserState(null)
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className="title">{getTitle(pathname)}</h1>
        {mobile && (
          <button
            aria-label="Menu"
            className={`${styles.mobileButton} ${
              mobileMenu && styles.mobileButtonActive
            }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          ></button>
        )}

        <nav
          className={`${mobile ? styles.navMobile : styles.nav} ${
            mobileMenu && styles.navMobileActive
          }`}
        >
          <Link
            href="/account"
            className={pathname === '/account' ? 'active' : ''}
          >
            <FeedIcon />
            {mobile && 'My Photos'}
          </Link>
          <Link
            href="/account/stats"
            className={pathname === '/account/stats' ? 'active' : ''}
          >
            <StatsIcon />
            {mobile && 'Stats'}
          </Link>
          <Link
            href="/account/post"
            className={pathname === '/account/post' ? 'active' : ''}
          >
            <AddIcon />
            {mobile && 'Add Photo'}
          </Link>
          <button onClick={handleLogout}>
            <LogoutIcon />
            {mobile && 'Logout'}
          </button>
        </nav>
      </header>
    </>
  );
}
