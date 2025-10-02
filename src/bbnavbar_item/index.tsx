'use client';

import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import BBLink from '../bblink';
import { createClassHelper } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type { TBBNavbarItemColorBorder } from '../types';

function removeSlashes(str: string | undefined) {
  if (!str) return '';
  const res = str.endsWith('/') ? str.slice(0, -1) : str;
  return res.startsWith('/') ? res.slice(1) : res;
}

// Create class helper with standardized patterns
const classHelper = createClassHelper(styles, {
  border: { prefix: 'border_' },
});

const getClassColorBorder = (colorBorder: TBBNavbarItemColorBorder): string => {
  return classHelper.border(colorBorder) || '';
};

/**
 * PROPS
 *
 * @param {React.ReactNode} title - Title to use for item. Can be a string or a React component.
 * @param {React.ReactElement=} children - Children to render.
 * @param {string} href - Href to use for item.
 * @param {string=} className - Any class name to add.
 * @param {TBBNavbarItemColorBorder=} colorBorder - Color of the border.
 * @param {boolean=} noBorder - Whether to disable the border.
 * @param {string[]=} activePaths - Paths to consider as active. Consider this an override to the current path. Do not include the base path.
 */
export interface IPropsBBNavbarItem {
  title: React.ReactNode;
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
      if (removeSlashes(currentPath) === removeSlashes(child.props.href)) {
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

  // Generate ID from title if it's a string, otherwise use a generic ID
  const itemId = typeof title === 'string' ? `nav-item-${title.toLowerCase()}` : 'nav-item';

  return (
    <li
      id={itemId}
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
