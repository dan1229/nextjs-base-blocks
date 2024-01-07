import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

export type TBBCardColorBackground = 'default' | 'white' | 'grey_light' | 'grey_dark' | 'black' | 'primary' | 'secondary';
export type TBBCardColorBorder = 'default' | 'transparent' | 'white' | 'grey_light' | 'grey_dark' | 'black' | 'primary' | 'secondary';
export type TBBCardElevation = 'none' | 'low' | 'med' | 'high';
export type TBBCardStyle = 'default' | 'transparent';

const getChildrenOnDisplayName = (children: React.ReactNode | React.ReactNode[], displayName: string) => {
  return React.Children.map(children, (child) => {
    if (
      !!child &&
      typeof child !== 'string' &&
      typeof child !== 'number' &&
      typeof child !== 'boolean' &&
      'type' in child &&
      typeof child.type !== 'string'
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (child.type && 'displayName' in child.type && child.type['displayName'] === displayName) {
        return child;
      }
    }
  });
};

/**
 * PROPS
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {TBBCardColorBackground=} color - the color of the text
 * @param {TBBCardElevation} elevation - the elevation of the card
 * @param {TBBCardStyle} cardStyle - the style of the card
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noBorder - Whether to remove the border
 */
export interface IPropsBBCard {
  children: React.ReactNode | React.ReactNode[];
  colorBackground?: TBBCardColorBackground;
  colorBorder?: TBBCardColorBorder;
  elevation?: TBBCardElevation;
  cardStyle?: TBBCardStyle;
  className?: string;
  onClick?: () => void;
  noBorder?: boolean;
}

/**
 * BBCard
 */
const BBCard = (Props: IPropsBBCard) => {
  const {
    children,
    colorBackground = 'default',
    colorBorder = 'transparent',
    elevation = 'med',
    cardStyle = 'default',
    className,
    onClick,
    noBorder = false,
  } = Props;
  const header = getChildrenOnDisplayName(children, 'Header');
  const body = getChildrenOnDisplayName(children, 'Body');
  const footer = getChildrenOnDisplayName(children, 'Footer');

  const getClassColorBackground = (): string => {
    switch (colorBackground) {
      case 'default':
        return styles.background_default;
      case 'white':
        return styles.background_white;
      case 'grey_light':
        return styles.background_grey_light;
      case 'grey_dark':
        return styles.background_grey_dark;
      case 'black':
        return styles.background_black;
      case 'primary':
        return styles.background_primary;
      case 'secondary':
        return styles.background_secondary;
    }
  };

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

  const getCardStyle = (): string => {
    switch (cardStyle) {
      case 'default':
        return '';
      case 'transparent':
        return styles.card_style__transparent;
    }
  };

  /**
   * RENDER
   */
  return (
    <div
      onClick={onClick}
      className={classNames(
        className,
        styles.base,
        !!onClick && styles.hover,
        noBorder && styles.no_border,
        getCardStyle(),
        getClassColorBackground(),
        getClassColorBorder(),
        getClassElevation()
      )}
    >
      {!!header && !!body && !!footer ? (
        <>
          {header}
          {body}
          {footer}
        </>
      ) : (
        <>{children}</>
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
 */
interface IPropsBBCardHeader {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
}

const Header = (props: IPropsBBCardHeader) => {
  const { children, className, onClick } = props;

  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <div className={classNames(styles.header, className)} onClick={onClick && onClickOverride}>
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
 */
interface IPropsBBCardBody {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
}

const Body = (props: IPropsBBCardBody) => {
  const { children, className, onClick } = props;

  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <div className={classNames(styles.body, className)} onClick={onClick && onClickOverride}>
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
 */
interface IPropsBBCardFooter {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
}

const Footer = (props: IPropsBBCardFooter) => {
  const { children, className, onClick } = props;

  const onClickOverride = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <div className={classNames(styles.footer, className)} onClick={onClick && onClickOverride}>
      {children}
    </div>
  );
};
Footer.displayName = 'Footer';
BBCard.Footer = Footer;

export default BBCard;
