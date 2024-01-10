import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import BBText from '../bbtext';
import useOutsideClick from '../utils/hooks/UseOutsideClick';
import styles from './styles.module.scss';

type TBBNavbarElevation = 'none' | 'low' | 'high' | 'rainbow';

/**
 * PROPS
 *
 * @param {string} title - Title to use for navbar
 * @param {React.ReactNode} children - Menu options of the navbar
 * @param {TBBNavbarElevation=} elevation - Elevation of the navbar
 * @param {string=} imageSrc - Image src for the navbar, can be URL or local
 * @param {string=} routeBrand - Route to use for the brand button
 * @param {React.ReactNode=} buttonsAuth - Auth buttons to use
 * @param {boolean=} showButtonsAuth - Show auth buttons
 */
export interface IPropsBBNavbar {
  title: string;
  children: React.ReactNode;
  elevation?: TBBNavbarElevation;
  imageSrc?: string;
  routeBrand?: string;
  buttonsAuth?: React.ReactNode;
  showButtonsAuth?: boolean;
}

/**
 * BBNAVBAR
 */
export default function BBNavbar(Props: IPropsBBNavbar): React.ReactElement {
  const { title, children, imageSrc, elevation = 'low', routeBrand = '/', buttonsAuth, showButtonsAuth = true } = Props;
  const [showNavExpanded, setShowNavExpanded] = useState(false);
  const router = useRouter();

  // outside click for detecting when to close the expanded nav
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    setShowNavExpanded(false);
  });

  const getClassElevation = () => {
    switch (elevation) {
      case 'none':
        return styles.elevation_none;
      case 'low':
        return styles.elevation_low;
      case 'high':
        return styles.elevation_high;
      case 'rainbow':
        return styles.elevation_rainbow;
    }
  };

  /**
   * RENDER
   */
  return (
    <nav className={classNames(styles.navigation, getClassElevation())} ref={ref}>
      <div className={styles.hamburger}>
        <AiOutlineMenu
          size={40}
          className={styles.iconHamburger}
          onClick={() => {
            setShowNavExpanded(!showNavExpanded);
          }}
        />
      </div>
      <div className={styles.containerBrand} onClick={async () => await router.push(routeBrand)}>
        <div className={styles.brand}>
          {!!imageSrc && <Image src={imageSrc} alt="" height={60} width={70} />}
          <BBText className={styles.textTitle} asSpan>
            {title}
          </BBText>
        </div>
      </div>
      <div className={classNames(styles.navigationMenu, showNavExpanded && styles.expanded)}>
        <ul className={styles.navigationMenuList}>{children}</ul>
      </div>
      <div className={styles.containerButtonsAuth}>{showButtonsAuth && buttonsAuth}</div>
    </nav>
  );
}
