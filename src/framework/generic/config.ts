import type { IBaseBlocksFramework } from '../types';

let framework: IBaseBlocksFramework = {};

/**
 * Register the host's routing primitives. Call it once, before the first render - the
 * registered hooks are called on every render, so swapping them later breaks the rules of
 * hooks.
 *
 * @example
 * // React Router
 * configureBaseBlocks({
 *   Link: ({ href, ...rest }) => <RouterLink to={href} {...rest} />,
 *   useNavigate: () => useNavigate(),
 *   usePathname: () => useLocation().pathname,
 * });
 */
export function configureBaseBlocks(config: IBaseBlocksFramework): void {
  framework = { ...framework, ...config };
}

export function getBaseBlocksFramework(): IBaseBlocksFramework {
  return framework;
}
