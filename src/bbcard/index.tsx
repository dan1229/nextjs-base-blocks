import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import type { IPropsBBBase, TBBCardColorBackground, TBBCardColorBorder, TBBCardElevation } from '../types';

const getClassColorBackgroundCard = (colorBackground: string | null): string | undefined => {
  if (!colorBackground) {
    return undefined;
  }
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
    case 'grey_lightest':
      return styles.background_card_grey_lightest;
    case 'grey_darkest':
      return styles.background_card_grey_darkest;
    case 'primary_light':
      return styles.background_card_primary_light;
    case 'primary_dark':
      return styles.background_card_primary_dark;
    case 'secondary_light':
      return styles.background_card_secondary_light;
    case 'secondary_dark':
      return styles.background_card_secondary_dark;
    case 'accent_light':
      return styles.background_card_accent_light;
    case 'accent_dark':
      return styles.background_card_accent_dark;
    case 'success':
      return styles.background_card_success;
    case 'success_light':
      return styles.background_card_success_light;
    case 'success_dark':
      return styles.background_card_success_dark;
    case 'warning':
      return styles.background_card_warning;
    case 'warning_light':
      return styles.background_card_warning_light;
    case 'warning_dark':
      return styles.background_card_warning_dark;
    case 'danger':
      return styles.background_card_danger;
    case 'danger_light':
      return styles.background_card_danger_light;
    case 'danger_dark':
      return styles.background_card_danger_dark;
    case 'info':
      return styles.background_card_info;
    case 'info_light':
      return styles.background_card_info_light;
    case 'info_dark':
      return styles.background_card_info_dark;
  }
};

const getClassColorBackgroundFooter = (colorBackground: string | null): string | undefined => {
  if (!colorBackground) {
    return undefined;
  }
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
    case 'grey_lightest':
      return styles.background_footer_grey_lightest;
    case 'grey_darkest':
      return styles.background_footer_grey_darkest;
    case 'primary_light':
      return styles.background_footer_primary_light;
    case 'primary_dark':
      return styles.background_footer_primary_dark;
    case 'secondary_light':
      return styles.background_footer_secondary_light;
    case 'secondary_dark':
      return styles.background_footer_secondary_dark;
    case 'accent_light':
      return styles.background_footer_accent_light;
    case 'accent_dark':
      return styles.background_footer_accent_dark;
    case 'success':
      return styles.background_footer_success;
    case 'success_light':
      return styles.background_footer_success_light;
    case 'success_dark':
      return styles.background_footer_success_dark;
    case 'warning':
      return styles.background_footer_warning;
    case 'warning_light':
      return styles.background_footer_warning_light;
    case 'warning_dark':
      return styles.background_footer_warning_dark;
    case 'danger':
      return styles.background_footer_danger;
    case 'danger_light':
      return styles.background_footer_danger_light;
    case 'danger_dark':
      return styles.background_footer_danger_dark;
    case 'info':
      return styles.background_footer_info;
    case 'info_light':
      return styles.background_footer_info_light;
    case 'info_dark':
      return styles.background_footer_info_dark;
  }
};

const getClassColorBackgroundHeader = (colorBackground: string | null): string | undefined => {
  if (!colorBackground) {
    return undefined;
  }
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
    case 'grey_lightest':
      return styles.background_header_grey_lightest;
    case 'grey_darkest':
      return styles.background_header_grey_darkest;
    case 'primary_light':
      return styles.background_header_primary_light;
    case 'primary_dark':
      return styles.background_header_primary_dark;
    case 'secondary_light':
      return styles.background_header_secondary_light;
    case 'secondary_dark':
      return styles.background_header_secondary_dark;
    case 'accent_light':
      return styles.background_header_accent_light;
    case 'accent_dark':
      return styles.background_header_accent_dark;
    case 'success':
      return styles.background_header_success;
    case 'success_light':
      return styles.background_header_success_light;
    case 'success_dark':
      return styles.background_header_success_dark;
    case 'warning':
      return styles.background_header_warning;
    case 'warning_light':
      return styles.background_header_warning_light;
    case 'warning_dark':
      return styles.background_header_warning_dark;
    case 'danger':
      return styles.background_header_danger;
    case 'danger_light':
      return styles.background_header_danger_light;
    case 'danger_dark':
      return styles.background_header_danger_dark;
    case 'info':
      return styles.background_header_info;
    case 'info_light':
      return styles.background_header_info_light;
    case 'info_dark':
      return styles.background_header_info_dark;
  }
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
      case 'grey_lightest':
        return styles.border_grey_lightest;
      case 'grey_darkest':
        return styles.border_grey_darkest;
      case 'primary_light':
        return styles.border_primary_light;
      case 'primary_dark':
        return styles.border_primary_dark;
      case 'secondary_light':
        return styles.border_secondary_light;
      case 'secondary_dark':
        return styles.border_secondary_dark;
      case 'accent_light':
        return styles.border_accent_light;
      case 'accent_dark':
        return styles.border_accent_dark;
      case 'success':
        return styles.border_success;
      case 'success_light':
        return styles.border_success_light;
      case 'success_dark':
        return styles.border_success_dark;
      case 'warning':
        return styles.border_warning;
      case 'warning_light':
        return styles.border_warning_light;
      case 'warning_dark':
        return styles.border_warning_dark;
      case 'danger':
        return styles.border_danger;
      case 'danger_light':
        return styles.border_danger_light;
      case 'danger_dark':
        return styles.border_danger_dark;
      case 'info':
        return styles.border_info;
      case 'info_light':
        return styles.border_info_light;
      case 'info_dark':
        return styles.border_info_dark;
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
      case 'default':
        return styles.elevation_default;
    }
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
