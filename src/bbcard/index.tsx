import classNames from 'classnames';
import styles from '@/base_blocks/src/bbcard/styles.module.scss';
import { useTheme } from 'next-themes';
import React from 'react';

export type TBBCardColorBackground = 'white' | 'grey_light' | 'grey_dark' | 'black';
export type TBBCardElevation = 'none' | 'low' | 'med' | 'high';

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
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 */
interface IPropsBBCard {
  children: React.ReactNode | React.ReactNode[];
  colorBackground?: TBBCardColorBackground;
  elevation?: TBBCardElevation;
  className?: string;
  onClick?: () => void;
}

/**
 * BBCard
 */
const BBCard = (Props: IPropsBBCard) => {
  const { theme } = useTheme();
  const { children, colorBackground = theme == 'dark' ? 'white' : 'black', elevation = 'med', className, onClick } = Props;
  const header = getChildrenOnDisplayName(children, 'Header');
  const body = getChildrenOnDisplayName(children, 'Body');
  const footer = getChildrenOnDisplayName(children, 'Footer');

  const getClassColorBackground = (): string => {
    switch (colorBackground) {
      case 'white':
        return styles.background_white;
      case 'grey_light':
        return styles.background_grey_light;
      case 'grey_dark':
        return styles.background_grey_dark;
      case 'black':
        return styles.background_black;
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

  /**
   * RENDER
   */
  return (
    <div
      onClick={onClick}
      className={classNames(className, styles.base, !!onClick && styles.hover, getClassColorBackground(), getClassElevation())}
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

/*
 * BBCard.Header
 */
interface IPropsBBCardHeader {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Header = (props: IPropsBBCardHeader) => {
  const { children, className } = props;
  return <div className={classNames(styles.header, className)}>{children}</div>;
};
Header.displayName = 'Header';
BBCard.Header = Header;

/*
 * BBCard.Body
 */
interface IPropsBBCardBody {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Body = (props: IPropsBBCardBody) => {
  const { children, className } = props;
  return <div className={classNames(styles.body, className)}>{children}</div>;
};
Body.displayName = 'Body';
BBCard.Body = Body;

/*
 * BBCard.Footer
 */
interface IPropsBBCardFooter {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Footer = (props: IPropsBBCardFooter) => {
  const { children, className } = props;
  return <div className={classNames(styles.footer, className)}>{children}</div>;
};
Footer.displayName = 'Footer';
BBCard.Footer = Footer;

export default BBCard;
