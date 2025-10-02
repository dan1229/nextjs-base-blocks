import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { createClassHelper } from '../utils/scss-class-functions';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBCardColorBackground, TBBCardColorBorder, TBBCardElevation } from '../types';

// Create class helper with standardized patterns
const classHelper = createClassHelper(styles, {
  backgroundCard: { prefix: 'background_card_' },
  backgroundFooter: { prefix: 'background_footer_' },
  backgroundHeader: { prefix: 'background_header_' },
  border: { prefix: 'border_' },
  elevation: { prefix: 'elevation_' },
});

const getClassColorBackgroundCard = (colorBackground: string | null): string | undefined => {
  return classHelper.backgroundCard(colorBackground);
};

const getClassColorBackgroundFooter = (colorBackground: string | null): string | undefined => {
  return classHelper.backgroundFooter(colorBackground);
};

const getClassColorBackgroundHeader = (colorBackground: string | null): string | undefined => {
  return classHelper.backgroundHeader(colorBackground);
};

/**
 * PROPS
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {TBBCardColorBackground=} color - the color of the text
 * @param {TBBCardElevation} elevation - the elevation of the card
 * @param {() => void=} onClick - Function to call when clicked
 * @param {string=} href - URL for the link
 * @param {boolean=} noBorder - Whether to remove the border
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 * @param {string=} className - Any class name to add
 */
export interface IPropsBBCard {
  children: React.ReactNode | React.ReactNode[];
  colorBackground?: TBBCardColorBackground;
  colorBorder?: TBBCardColorBorder;
  elevation?: TBBCardElevation;
  onClick?: () => void;
  href?: string;
  noBorder?: boolean;
  className?: string;
}

/**
 * BBCard
 */
const BBCard = (Props: IPropsBBBase & IPropsBBCard) => {
  const {
    children,
    colorBackground = 'default',
    colorBorder = 'default',
    elevation = 'med',
    className,
    onClick,
    href,
    noBorder = false,
  } = Props;

  const getClassColorBorder = (): string => {
    return classHelper.border(colorBorder) || '';
  };

  const getClassElevation = (): string => {
    return classHelper.elevation(elevation) || '';
  };

  if (!!href && !!onClick) {
    console.warn('BBCard: Both href and onClick are set. Only href will be used.');
  }

  /**
   * RENDER
   */
  const hover = !!onClick || (href?.length ?? 0) > 0;
  return (
    <div
      onClick={!href ? onClick : undefined}
      className={classNames(
        className,
        styles.base,
        // if there is an onClick or href, add hover effect
        hover ? styles.hover : '',
        noBorder ? styles.no_border : '',
        getClassColorBackgroundCard(colorBackground),
        getClassColorBorder(),
        getClassElevation()
      )}
    >
      {href ? (
        <Link href={href} className={styles.linkCard} target="_blank" rel="noopener noreferrer">
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

/**
 * BBCard.Header
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {boolean=} noPadding - Whether to remove the padding
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 */
interface IPropsBBCardHeader {
  children: React.ReactNode | React.ReactNode[];
  noPadding?: boolean;
  colorBackground?: TBBCardColorBackground;
}

const Header = (props: IPropsBBCardHeader & IPropsBBBase) => {
  const { children, className, onClick, noPadding = false, colorBackground = null } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      className={classNames(styles.header, className, noPadding && styles.no_padding, getClassColorBackgroundHeader(colorBackground))}
      onClick={onClick && onClickOverride}
    >
      {children}
    </div>
  );
};
Header.displayName = 'Header';
BBCard.Header = Header;

/**
 * BBCard.Body
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {boolean=} noPadding - Whether to remove the padding
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 */
interface IPropsBBCardBody {
  children: React.ReactNode | React.ReactNode[];
  noPadding?: boolean;
  colorBackground?: TBBCardColorBackground;
}

const Body = (props: IPropsBBCardBody & IPropsBBBase) => {
  const { children, className, onClick, noPadding = false, colorBackground = null } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      className={classNames(styles.body, className, noPadding && styles.no_padding, getClassColorBackgroundCard(colorBackground))}
      onClick={onClick && onClickOverride}
    >
      {children}
    </div>
  );
};
Body.displayName = 'Body';
BBCard.Body = Body;

/**
 * BBCard.Footer
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {boolean=} noPadding - Whether to remove the padding
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 */
interface IPropsBBCardFooter {
  children: React.ReactNode | React.ReactNode[];
  noPadding?: boolean;
  colorBackground?: TBBCardColorBackground;
}

const Footer = (props: IPropsBBCardFooter & IPropsBBBase) => {
  const { children, className, onClick, noPadding = false, colorBackground = null } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <div
      className={classNames(styles.footer, className, noPadding && styles.no_padding, getClassColorBackgroundFooter(colorBackground))}
      onClick={onClick && onClickOverride}
    >
      {children}
    </div>
  );
};
Footer.displayName = 'Footer';
BBCard.Footer = Footer;

export default BBCard;
