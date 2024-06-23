'use client';

import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import BBLink from '../bblink';
import styles from './styles.module.scss';

function removeSlashes(str: string | undefined) {
  if (!str) return '';
  const res = str.endsWith('/') ? str.slice(0, -1) : str;
  return res.startsWith('/') ? res.slice(1) : res;
}

/**
 * PROPS
 *
 * @param {string} title - Title to use for item.
 * @param {string} href - Href to use for item.
 * @param {string=} className - Any class name to add.
 * @param {React.ReactElement=} children - Children to render.
 */
export interface IPropsBBNavbarItem {
  title: string;
  href: string;
  className?: string;
  children?: React.ReactElement[];
}

/**
 * BBNAVBAR ITEM
 */
export default function BBNavbarItem(Props: IPropsBBNavbarItem): React.ReactElement {
  const { title, href, className, children } = Props;
  const [isActiveInDropdown, setIsActiveInDropdown] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('');

  // Detect the current pathname in a way compatible with both Page Router and App Router
  const path = usePathname();
  useEffect(() => {
    const isAppRouter = typeof path === 'string';
    if (isAppRouter) {
      setCurrentPath(path);
    } else {
      setCurrentPath(window.location.pathname);
    }
  }, [path]);

  useEffect(() => {
    let found = false;
    children?.forEach((child) => {
      if (removeSlashes(currentPath) === removeSlashes(child.props.href)) {
        found = true;
      }
    });
    setIsActiveInDropdown(found);
  }, [children, currentPath]);

  const urlMatch = !!currentPath.length && !!href.length && removeSlashes(currentPath) === removeSlashes(href);
  const isActive = urlMatch || isActiveInDropdown;

  return (
    <li
      id={`nav-item-${title.toLowerCase()}`}
      className={classnames(
        styles.navbarItemBase,
        styles.dropdownContainer,
        { [styles.active]: isActive, [styles.hasChildren]: !!children?.length },
        className
      )}
    >
      <div className={styles.navbarContentContainer}>
        <div className={styles.navbarHeaderContainer}>
          <BBLink
            href={href}
            className={styles.textLink}
            // hover is handled by this BBNavbarItem component
            hover={false}
          >
            {title}
          </BBLink>
          {!!children?.length && <IoMdArrowDropdown size={30} className={styles.iconDropdown} />}
        </div>
        {!!children?.length && <ul className={styles.dropdownContent}>{children}</ul>}
      </div>
    </li>
  );
}
