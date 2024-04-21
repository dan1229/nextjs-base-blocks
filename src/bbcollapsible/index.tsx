import React, { useState, Children, cloneElement } from 'react';
import BBCard from '../bbcard';
import styles from './styles.module.scss';
import { IPropsBBCard } from 'src/bbcard';
import { TBBCollapsibleHeaderColor } from '../types';
import classnames from 'classnames';

/**
 * BBCollapsible
 * Renders a collapsible component with a header and body content.
 */
const BBCollapsible = ({ children, ...props }: IPropsBBCard) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const header = Children.toArray(children).find((child: any) => child.type.displayName === 'Header');
  const content = Children.toArray(children).find((child: any) => child.type.displayName === 'Content');

  return (
    <BBCard {...props}>
      {cloneElement(header as React.ReactElement, { onClick: toggleExpand, isExpanded })}
      {isExpanded && content}
    </BBCard>
  );
};

/**
 * PROPS
 * @param {React.ReactNode | React.ReactNode[]} children - The children components, specifically Header and Content for the collapsible
 * @param {string=} className - Any class name to add
 * @param {boolean=} noPadding - Whether to remove padding from the content
 * @param {boolean=} isExpanded - Whether the content is expanded
 */
interface IPropsBBCollapsibleSection {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  noPadding?: boolean;
  isExpanded?: boolean;
  colorArrow?: TBBCollapsibleHeaderColor;
}

/**
 * BBCollapsible.Header
 */
const Header = ({ children, isExpanded, colorArrow = 'default', ...props }: IPropsBBCollapsibleSection) => {
  return (
    <BBCard.Header {...props} className={styles.mainCollapsibleHeader}>
      {children}
      <div className={classnames(styles.containerArrow, styles[colorArrow])}>{isExpanded ? '▲' : '▼'}</div>
    </BBCard.Header>
  );
};
Header.displayName = 'Header';

/**
 * BBCollapsible.Content
 */
const Content = ({ children, ...props }: IPropsBBCollapsibleSection) => {
  return <BBCard.Body {...props}>{children}</BBCard.Body>;
};
Content.displayName = 'Content';

// Assigning Header and Content as static properties of BBCollapsible
BBCollapsible.Header = Header;
BBCollapsible.Content = Content;

export default BBCollapsible;
