import classnames from 'classnames';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [isActiveInDropdown, setIsActiveInDropdown] = useState(false);
  const hasChildren = !!children && children.length > 0;

  useEffect(() => {
    let found = false;
    children?.forEach((child) => {
      if (removeSlashes(window.location.pathname) === removeSlashes(child.props.href)) {
        found = true;
      }
    });
    setIsActiveInDropdown(found);
  }, [children]);

  if (!router.isReady) {
    return <></>;
  }
  const urlMatch = !!router.asPath.length && !!href.length && removeSlashes(router.asPath) === removeSlashes(href);
  const isActive = urlMatch || isActiveInDropdown;

  return (
    <li
      id={`nav-item-${title.toLowerCase()}`}
      className={classnames(
        styles.navbarItemBase,
        styles.dropdownContainer,
        { [styles.active]: isActive, [styles.hasChildren]: hasChildren },
        className
      )}
    >
      <div className={styles.navbarContentContainer}>
        <div className={styles.navbarHeaderContainer}>
          <BBLink href={href} color={isActive ? 'white' : 'secondary'}>
            {title}
          </BBLink>
          {hasChildren && <IoMdArrowDropdown size={30} className={styles.iconDropdown} />}
        </div>
        {hasChildren && <ul className={styles.dropdownContent}>{children}</ul>}
      </div>
    </li>
  );
}
