'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
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
 * @param {boolean=} brandHorizontal - Whether the brand is horizontal
 * @param {boolean=} boldTitle - Whether the title is bold
 * @param {string=} menuAlignment - [DEPRECATED] Use horizontalAlignment instead
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
  brandHorizontal?: boolean;
  boldTitle?: boolean;
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
    brandHorizontal = false,
    boldTitle = false,
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
            <div className={classNames(styles.brand, brandHorizontal ? styles.brandHorizontal : styles.brandVertical)}>
              {!!imageSrc && <Image src={imageSrc} alt="" height={imageHeight} width={imageWidth} />}
              {!!title && title.length && (
                <BBText className={styles.textTitle} color={colorTitle} size={textSizeTitle} bold={boldTitle} asSpan>
                  {title}
                </BBText>
              )}
            </div>
          </div>
        </div>
        <div className={classNames(styles.navigationMenu, showNavExpanded && styles.expanded, vertical && styles.vertical)}>
          <ul className={styles.navigationMenuList}>{children}</ul>
        </div>
        <div className={classNames(styles.containerButtonsAction, showNavExpanded && styles.expanded)}>
          {showButtonsAction && buttonsAction}
        </div>
      </nav>
      <div className={classNames(styles.content, vertical && styles.vertical)}>{mainContent}</div>
    </div>
  );
}
