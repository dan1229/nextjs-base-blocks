'use client';

import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import BBLink from '../bblink';
import styles from './styles.module.scss';
import type { TBBNavbarItemColorBorder } from '../types';

function removeSlashes(str: string | undefined) {
  if (!str) return '';
  const res = str.endsWith('/') ? str.slice(0, -1) : str;
  return res.startsWith('/') ? res.slice(1) : res;
}

const getClassColorBorder = (colorBorder: TBBNavbarItemColorBorder): string => {
  switch (colorBorder) {
    case 'default':
      return styles.border_default;
    case 'transparent':
      return styles.border_transparent;
    case 'white':
      return styles.border_white;
    case 'grey_light':
      return styles.border_grey_light;
    case 'grey_dark':
      return styles.border_grey_dark;
    case 'black':
      return styles.border_black;
    case 'primary':
      return styles.border_primary;
    case 'secondary':
      return styles.border_secondary;
    case 'accent':
      return styles.border_accent;
  }
};

/**
 * PROPS
 *
 * @param {string} title - Title to use for item.
 * @param {React.ReactElement=} children - Children to render.
 * @param {string} href - Href to use for item.
 * @param {string=} className - Any class name to add.
 * @param {TBBNavbarItemColorBorder=} colorBorder - Color of the border.
 * @param {boolean=} noBorder - Whether to disable the border.
 * @param {string[]=} activePaths - Paths to consider as active. Consider this an override to the current path. Do not include the base path.
 */
export interface IPropsBBNavbarItem {
  title: string;
  children?: React.ReactElement[];
  href: string;
  className?: string;
  colorBorder?: TBBNavbarItemColorBorder;
  noBorder?: boolean;
  activePaths?: string[];
}

/**
 * BBNAVBAR ITEM
 */
export default function BBNavbarItem(Props: IPropsBBNavbarItem): React.ReactElement {
  const { title, href, className, children, colorBorder = 'default', noBorder = false, activePaths } = Props;
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
      if (removeSlashes(currentPath) === removeSlashes((child.props as { href: string }).href)) {
        found = true;
      }
    });

    // Check if the current path is in the active paths
    if (activePaths) {
      activePaths.forEach((activePath) => {
        if (removeSlashes(currentPath) === removeSlashes(activePath)) {
          found = true;
        }
      });
    }

    setIsActiveInDropdown(found);
  }, [children, currentPath, activePaths]);

  const urlMatch = !!currentPath.length && !!href.length && removeSlashes(currentPath) === removeSlashes(href);
  const isActive = urlMatch || isActiveInDropdown;

  return (
    <li
      id={`nav-item-${title.toLowerCase()}`}
      className={classnames(
        styles.navbarItemBase,
        styles.dropdownContainer,
        noBorder ? styles.noBorder : '',
        getClassColorBorder(colorBorder),
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
