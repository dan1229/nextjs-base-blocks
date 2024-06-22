import classNames from 'classnames';
import React from 'react';
import BBLink from '../bblink';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBCardColorBackground, TBBCardColorBorder, TBBCardElevation, TBBTextColor } from '../types';
const getClassColorBackgroundCard = (colorBackground: string): string | undefined => {
  switch (colorBackground) {
    case 'default':
      return styles.background_card_default;
    case 'transparent':
      return styles.background_card_transparent;
    case 'white':
      return styles.background_card_white;
    case 'grey_light':
      return styles.background_card_grey_light;
    case 'grey_dark':
      return styles.background_card_grey_dark;
    case 'black':
      return styles.background_card_black;
    case 'primary':
      return styles.background_card_primary;
    case 'secondary':
      return styles.background_card_secondary;
    case 'accent':
      return styles.background_card_accent;
  }
};

const getClassColorBackgroundFooter = (colorBackground: string): string | undefined => {
  switch (colorBackground) {
    case 'default':
      return styles.background_footer_default;
    case 'transparent':
      return styles.background_footer_transparent;
    case 'white':
      return styles.background_footer_white;
    case 'grey_light':
      return styles.background_footer_grey_light;
    case 'grey_dark':
      return styles.background_footer_grey_dark;
    case 'black':
      return styles.background_footer_black;
    case 'primary':
      return styles.background_footer_primary;
    case 'secondary':
      return styles.background_footer_secondary;
    case 'accent':
      return styles.background_footer_accent;
  }
};

const getClassColorBackgroundHeader = (colorBackground: string): string | undefined => {
  switch (colorBackground) {
    case 'default':
      return styles.background_header_default;
    case 'transparent':
      return styles.background_header_transparent;
    case 'white':
      return styles.background_header_white;
    case 'grey_light':
      return styles.background_header_grey_light;
    case 'grey_dark':
      return styles.background_header_grey_dark;
    case 'black':
      return styles.background_header_black;
    case 'primary':
      return styles.background_header_primary;
    case 'secondary':
      return styles.background_header_secondary;
    case 'accent':
      return styles.background_header_accent;
  }
};

/**
 * PROPS
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {TBBCardColorBackground=} color - the color of the text
 * @param {TBBCardElevation} elevation - the elevation of the card
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {string=} href - URL for the link
 * @param {TBBTextColor=} hrefColor - The color of the link
 * @param {boolean=} noBorder - Whether to remove the border
 */
export interface IPropsBBCard {
  children: React.ReactNode | React.ReactNode[];
  colorBackground?: TBBCardColorBackground;
  colorBorder?: TBBCardColorBorder;
  elevation?: TBBCardElevation;
  onClick?: () => void;
  href?: string;
  hrefColor?: TBBTextColor;
  noBorder?: boolean;
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
    hrefColor = 'black',
    noBorder = false,
  } = Props;

  const getClassColorBorder = (): string => {
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

  const getClassElevation = (): string => {
    switch (elevation) {
      case 'none':
        return styles.elevation_none;
      case 'low':
        return styles.elevation_low;
      case 'med':
        return styles.elevation_med;
      case 'high':
        return styles.elevation_high;
    }
  };

  if (!!href && !!onClick) {
    console.warn('BBCard: Both href and onClick are set. Only href will be used.');
  }

  /**
   * RENDER
   */
  return (
    <div
      onClick={!href ? onClick : undefined}
      className={classNames(
        className,
        styles.base,
        !!onClick && styles.hover,
        noBorder && styles.no_border,
        getClassColorBackgroundCard(colorBackground),
        getClassColorBorder(),
        getClassElevation()
      )}
    >
      {href ? (
        <BBLink href={href} underline={false} color={hrefColor}>
          {children}
        </BBLink>
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
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noPadding - Whether to remove the padding
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 */
interface IPropsBBCardHeader {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
  colorBackground?: TBBCardColorBackground;
}

const Header = (props: IPropsBBCardHeader) => {
  const { children, className, onClick, noPadding = false, colorBackground = 'default' } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
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
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noPadding - Whether to remove the padding
 */
interface IPropsBBCardBody {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

const Body = (props: IPropsBBCardBody) => {
  const { children, className, onClick, noPadding = false } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <div className={classNames(styles.body, className, noPadding && styles.no_padding)} onClick={onClick && onClickOverride}>
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
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noPadding - Whether to remove the padding
 * @param {TBBCardColorBackground=} colorBackground - The color of the background
 */
interface IPropsBBCardFooter {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
  colorBackground?: TBBCardColorBackground;
}

const Footer = (props: IPropsBBCardFooter) => {
  const { children, className, onClick, noPadding = false, colorBackground = 'default' } = props;

  // This is a fix for the onClick event not being triggered when the parent has an onClick event
  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
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
