import classnames from 'classnames';
import React, { useState, Children, cloneElement, useEffect } from 'react';
import BBButton from '../bbbutton';
import BBCard from '../bbcard';
import styles from './styles.module.scss';
import type { IPropsBBCard } from '../bbcard';
import type { IPropsBBBase, TBBButtonVariant } from '../types';

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
      {cloneElement(header as React.ReactElement, { onClick: toggleExpand, showButtonUp: isExpanded })}
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
 * @param {boolean=} showButtonUp - Whether to show the button up
 * @param {TBBButtonVariant=} buttonVariant - The variant of the button
 * @param {boolean=} buttonTransparent - Whether the button is transparent
 * @param {string=} classNameButton - Any class name to add to the button
 */
export interface IPropsBBCollapsibleSection extends IPropsBBBase {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  noPadding?: boolean;
  showButtonUp?: boolean;
  arrowUp?: React.ReactNode;
  arrowDown?: React.ReactNode;
  buttonVariant?: TBBButtonVariant;
  buttonTransparent?: boolean;
  classNameButton?: string;
}

/**
 * BBCollapsible.Header
 */
const Header = (props: IPropsBBCollapsibleSection) => {
  const {
    children,
    showButtonUp,
    arrowUp = '▲',
    arrowDown = '▼',
    buttonVariant = 'transparent-primary',
    buttonTransparent,
    classNameButton,
  } = props;
  return (
    <BBCard.Header {...props} className={styles.mainCollapsibleHeader}>
      {children}
      <div className={styles.containerButtonCollapsible}>
        <BBButton
          // on click is necessary to un-disable the button
          variant={buttonVariant}
          transparent={buttonTransparent}
          onClick={() => {}}
          icon={{ icon: showButtonUp ? arrowUp : arrowDown }}
          className={classnames(styles.buttonArrow, classNameButton)}
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
