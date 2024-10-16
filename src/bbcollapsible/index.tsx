import classnames from 'classnames';
import React, { useState, Children, cloneElement, useEffect } from 'react';
import BBButton from '../bbbutton';
import BBCard from '../bbcard';
import styles from './styles.module.scss';
import type { IPropsBBCard } from '../bbcard';
import type { IPropsBBBase, TBBCollapsibleHeaderColor } from '../types';

/**
 * PROPS
 * @param {boolean=} isExpandedInitial - Whether the content is expanded initially
 * @param {Function=} onExpanded - Callback function when the expanded state changes
 * @param {Function=} onCollapsed - Callback function when the collapsed state changes
 */
export interface IPropsBBCollapsible extends IPropsBBCard {
  isExpandedInitial?: boolean;
  onExpanded?: (isExpanded: boolean) => void;
  onCollapsed?: () => void;
}

/**
 * BBCollapsible
 * Renders a collapsible component with a header and body content.
 */
const BBCollapsible = (props: IPropsBBCollapsible) => {
  const { isExpandedInitial = false, children, onExpanded, onCollapsed } = props;
  const [isExpanded, setIsExpanded] = useState(isExpandedInitial);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Call onExpanded or onCollapsed callback when the expanded state changes
  useEffect(() => {
    if (isExpanded && onExpanded) {
      onExpanded(isExpanded);
    } else if (!isExpanded && onCollapsed) {
      onCollapsed();
    }
  }, [isExpanded, onExpanded, onCollapsed]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const header = Children.toArray(children).find((child: any) => child.type.displayName === 'Header');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * @param {React.ReactNode=} arrowUp - The arrow up icon
 * @param {React.ReactNode=} arrowDown - The arrow down icon
 * @param {boolean=} isExpanded - Whether the content is expanded
 */
export interface IPropsBBCollapsibleSection extends IPropsBBBase {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  noPadding?: boolean;
  isExpanded?: boolean;
  arrowUp?: React.ReactNode;
  arrowDown?: React.ReactNode;
  colorArrow?: TBBCollapsibleHeaderColor;
}

/**
 * BBCollapsible.Header
 */
const Header = (props: IPropsBBCollapsibleSection) => {
  const { children, isExpanded, colorArrow = 'default', arrowUp = '▲', arrowDown = '▼' } = props;
  return (
    <BBCard.Header {...props} className={styles.mainCollapsibleHeader}>
      {children}
      <div>
        <BBButton
          // on click is necessary to un-disable the button
          onClick={() => {}}
          icon={{ icon: isExpanded ? arrowUp : arrowDown }}
          className={classnames(styles.containerArrow, styles[colorArrow])}
        />
      </div>
    </BBCard.Header>
  );
};
Header.displayName = 'Header';

/**
 * PROPS
 */
export interface IPropsBBCollapsibleContent extends IPropsBBCard {}

/**
 * BBCollapsible.Content
 */
const Content = (props: IPropsBBCollapsibleContent) => {
  const { children } = props;
  return <BBCard.Body {...props}>{children}</BBCard.Body>;
};
Content.displayName = 'Content';

// Assigning Header and Content as static properties of BBCollapsible
BBCollapsible.Header = Header;
BBCollapsible.Content = Content;

export default BBCollapsible;
