'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import BBText from '../bbtext';
import useOutsideClick from '../utils/hooks/UseOutsideClick';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBTextColor } from '../types';

type TBBNavbarElevation = 'none' | 'low' | 'high' | 'rainbow';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - Menu options of the navbar
 * @param {string=} title - Title to use for navbar
 * @param {TBBTextColor=} colorTitle - Color of the title
 * @param {TBBNavbarElevation=} elevation - Elevation of the navbar
 * @param {string=} imageSrc - Image src for the navbar, can be URL or local
 * @param {string=} routeBrand - Route to use for the brand button
 * @param {React.ReactNode=} buttonsAuth - Auth buttons to use
 * @param {boolean=} showButtonsAuth - Show auth buttons
 * @param {number=} imageWidth - Width of the image
 * @param {number=} imageHeight - Height of the image
 */
export interface IPropsBBNavbar {
  children: React.ReactNode;
  title?: string;
  colorTitle?: TBBTextColor;
  elevation?: TBBNavbarElevation;
  imageSrc?: string;
  routeBrand?: string;
  buttonsAuth?: React.ReactNode;
  showButtonsAuth?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * BBNAVBAR
 */
export default function BBNavbar(props: IPropsBBNavbar & Omit<IPropsBBBase, 'onClick'>): React.ReactElement {
  const {
    children,
    title,
    colorTitle = 'primary',
    imageSrc,
    elevation = 'low',
    routeBrand = '/',
    buttonsAuth,
    showButtonsAuth = true,
    imageWidth = 60,
    imageHeight = 60,
  } = props;
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
          {!!imageSrc && <Image src={imageSrc} alt="" height={imageHeight} width={imageWidth} />}
          {!!title && title.length && (
            <BBText className={styles.textTitle} color={colorTitle} asSpan>
              {title}
            </BBText>
          )}
        </div>
      </div>
      <div className={classNames(styles.navigationMenu, showNavExpanded && styles.expanded)}>
        <ul className={styles.navigationMenuList}>{children}</ul>
      </div>
      <div className={styles.containerButtonsAuth}>{showButtonsAuth && buttonsAuth}</div>
    </nav>
  );
}
