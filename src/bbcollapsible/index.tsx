import React, { useState } from 'react';
import BBCard from '../bbcard';
import styles from './styles.module.scss';
import { IPropsBBCard } from 'src/bbcard';

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
export interface IPropsBBCollapsible {
  children: React.ReactNode | React.ReactNode[];
  //   colorBackground?: TBBCardColorBackground;
  //   colorBorder?: TBBCardColorBorder;
  //   elevation?: TBBCardElevation;
  //   className?: string;
  //   onClick?: () => void;
  //   href?: string;
  //   hrefColor?: TBBTextColor;
  //   noBorder?: boolean;
}

/**
 * BBCollapsible
 */
const BBCollapsible = (props: IPropsBBCard) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <BBCard>
      <BBCard.Header onClick={toggleExpand}>{props.children}</BBCard.Header>
      {isExpanded && <BBCard.Body>{props.children}</BBCard.Body>}
    </BBCard>
  );
};

/**
 * BBCollapsible.Header
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noPadding - Whether to remove the padding
 */
interface IPropsBBCollapsibleHeader {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

const Header = (props: IPropsBBCollapsibleHeader) => {
  return <BBCard.Header {...props}>{props.children}</BBCard.Header>;
};
Header.displayName = 'Header';
BBCollapsible.Header = Header;

/**
 * BBCollapsible.Content
 *
 * @param {React.ReactNode | React.ReactNode[]} children - The text to display
 * @param {string=} className - Any class name to add
 * @param {() => void=} onClick - Function to call when clicked
 * @param {boolean=} noPadding - Whether to remove the padding
 */
interface IPropsBBCollapsibleContent {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

const Content = (props: IPropsBBCollapsibleContent) => {
  return <BBCard.Body {...props}>{props.children}</BBCard.Body>;
};
Content.displayName = 'Content';
BBCollapsible.Content = Content;

export default BBCollapsible;
