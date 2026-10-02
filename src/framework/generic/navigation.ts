import { getBaseBlocksFramework } from './config';
import type { TFrameworkNavigate } from '../types';

function useBrowserNavigate(): TFrameworkNavigate {
  return (href: string) => {
    window.location.assign(href);
  };
}

/**
 * Null tells `BBNavbarItem` to read `window.location.pathname` itself.
 */
function useNoPathname(): string | null {
  return null;
}

// Which hook runs is fixed by the registration, which is why `configureBaseBlocks` has to
// run before the first render and not change afterwards.

export function useNavigate(): TFrameworkNavigate {
  const useImplementation = getBaseBlocksFramework().useNavigate ?? useBrowserNavigate;
  return useImplementation();
}

export function usePathname(): string | null {
  const useImplementation = getBaseBlocksFramework().usePathname ?? useNoPathname;
  return useImplementation();
}
