import { useRouter } from 'next/navigation';
import type { TFrameworkNavigate } from './types';

export { usePathname } from 'next/navigation';

export function useNavigate(): TFrameworkNavigate {
  const router = useRouter();
  return (href: string) => {
    router.push(href);
  };
}
