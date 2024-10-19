'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import BBText from '../bbtext';
import useOutsideClick from '../utils/hooks/UseOutsideClick';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBTextColor, TBBTextSize } from '../types';

type TBBNavbarElevation = 'none' | 'low' | 'high' | 'rainbow';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - Menu options of the navbar
 * @param {React.ReactNode} mainContent - Main content to be displayed alongside the navbar
 * @param {string=} title - Title to use for navbar
 * @param {TBBTextColor=} colorTitle - Color of the title
 * @param {TBBNavbarElevation=} elevation - Elevation of the navbar
 * @param {string=} imageSrc - Image src for the navbar, can be URL or local
 * @param {string=} routeBrand - Route to use for the brand button
 * @param {boolean=} vertical - Whether the navbar items are vertical
 * @param {TBBTextSize=} textSizeTitle - Size of the title
 * @param {React.ReactNode=} buttonsAction - Auth buttons to use
 * @param {boolean=} showButtonsAction - Show auth buttons
 * @param {number=} imageWidth - Width of the image
 * @param {number=} imageHeight - Height of the image
 * @param {string=} classNameWrapper - Custom class name for the wrapper. Doesn't really apply with vertical.
 */
export interface IPropsBBNavbar {
  children: React.ReactNode;
  mainContent: React.ReactNode;
  title?: string;
  colorTitle?: TBBTextColor;
  elevation?: TBBNavbarElevation;
  imageSrc?: string;
  routeBrand?: string;
  textSizeTitle?: TBBTextSize;
  buttonsAction?: React.ReactNode;
  showButtonsAction?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  vertical?: boolean;
  classNameWrapper?: string;
}

/**
 * BBNAVBAR
 */
export default function BBNavbar(props: IPropsBBNavbar & Omit<IPropsBBBase, 'onClick'>): React.ReactElement {
  const {
    children,
    mainContent,
    title,
    colorTitle = 'primary',
    imageSrc,
    elevation = 'low',
    routeBrand = '/',
    buttonsAction,
    textSizeTitle = 'medium',
    showButtonsAction = true,
    imageWidth = 60,
    imageHeight = 60,
    vertical = false,
    classNameWrapper,
  } = props;

  const [showNavExpanded, setShowNavExpanded] = useState(false);
  const router = useRouter();

  // outside click for detecting when to close the expanded nav
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    setShowNavExpanded(false);
  });

  // Dynamically adjust content margin based on the navbar height
  useEffect(() => {
    const adjustContentMargin = () => {
      const navbarHeight = ref.current?.offsetHeight || 0;
      const contentElement = document.querySelector(`.${styles.content}`) as HTMLElement;

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (contentElement) {
        // Only adjust margin if the navbar height is different from the existing margin
        const existingMargin = parseInt(contentElement.style.marginTop, 10) || 0;
        if (existingMargin !== navbarHeight) {
          contentElement.style.marginTop = `${navbarHeight}px`;
        }
      }
    };

    // Adjust once on initial load
    adjustContentMargin();

    // Listen for window resize to dynamically adjust
    window.addEventListener('resize', adjustContentMargin);

    return () => {
      window.removeEventListener('resize', adjustContentMargin);
    };
  }, []);

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
    <div className={classNames(styles.wrapper, vertical && styles.vertical, classNameWrapper)}>
      <nav className={classNames(styles.navigation, getClassElevation(), vertical && styles.vertical)} ref={ref}>
        <div className={classNames(styles.wrapperBrandAndHamburger, vertical && styles.verticalWrapper)}>
          <div className={styles.hamburger}>
            <AiOutlineMenu
              size={40}
              className={styles.iconHamburger}
              onClick={() => {
                setShowNavExpanded(!showNavExpanded);
              }}
            />
          </div>
          <div className={styles.containerBrand} onClick={async () => router.push(routeBrand)}>
            <div className={styles.brand}>
              {!!imageSrc && <Image src={imageSrc} alt="" height={imageHeight} width={imageWidth} />}
              {!!title && title.length && (
                <BBText className={styles.textTitle} color={colorTitle} size={textSizeTitle} asSpan>
                  {title}
                </BBText>
              )}
            </div>
          </div>
        </div>
        <div className={classNames(styles.navigationMenu, showNavExpanded && styles.expanded, vertical && styles.vertical)}>
          <ul className={styles.navigationMenuList}>{children}</ul>
        </div>
        <div className={styles.containerButtonsAction}>{showButtonsAction && buttonsAction}</div>
      </nav>
      <div className={classNames(styles.content, vertical && styles.vertical)}>{mainContent}</div>
    </div>
  );
}
