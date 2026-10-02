import type React from 'react';

/**
 * FRAMEWORK TYPES
 *
 * The routing and image primitives the blocks need from their host. `link`, `image` and
 * `navigation` in this directory supply them from Next.js, and `generic/` supplies the same
 * exports with no Next.js import for every other host.
 */
export interface IPropsFrameworkLink {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface IPropsFrameworkImage {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export type TFrameworkNavigate = (href: string) => void;

/**
 * What a non-Next host registers through `configureBaseBlocks`. Every key is optional - an
 * unset one falls back to the plain browser behavior.
 *
 * @param {React.ComponentType<IPropsFrameworkLink>=} Link - Client-side link component
 * @param {React.ComponentType<IPropsFrameworkImage>=} Image - Image component
 * @param {() => TFrameworkNavigate=} useNavigate - Hook returning an imperative navigate
 * @param {() => string | null=} usePathname - Hook returning the current pathname
 */
export interface IBaseBlocksFramework {
  Link?: React.ComponentType<IPropsFrameworkLink>;
  Image?: React.ComponentType<IPropsFrameworkImage>;
  useNavigate?: () => TFrameworkNavigate;
  usePathname?: () => string | null;
}
