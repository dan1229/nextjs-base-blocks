import useOutsideClick from '@/utils/hooks/UseOutsideClick';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import Image from 'next/image';
import { isLoggedIn } from '@/utils/auth';
import ButtonsAuth from '@/components/buttons/buttons_auth';
import ButtonLogout from '@/components/buttons/button_logout';
import { stateUser } from '@/states/auth';
import { useRecoilState } from 'recoil';

type TBBNavbarElevation = 'none' | 'low' | 'high' | 'rainbow';

/**
 * PROPS
 *
 * @param {string} title - Title to use for navbar
 * @param {React.ReactNode} children - Menu options of the navbar
 * @param {TBBNavbarElevation=} elevation - Elevation of the navbar
 * @param {string=} imageSrc - Image src for the navbar, can be URL or local
 * @param {string=} routeHome - Route to use for the home button
 * @param {boolean=} showButtonsAuth - Show the auth buttons
 */
interface IPropsBBNavbar {
  title: string;
  children: React.ReactNode;
  elevation?: TBBNavbarElevation;
  imageSrc?: string;
  routeHome?: string;
  showButtonsAuth?: boolean;
}

/**
 * BBNAVBAR
 */
export default function BBNavbar(Props: IPropsBBNavbar): React.ReactElement {
  const { title = 'Get Starty', children, imageSrc, elevation = 'low', routeHome = '/', showButtonsAuth = true } = Props;
  const [user] = useRecoilState(stateUser);
  const [showNavExpanded, setShowNavExpanded] = useState(false);
  const [buttonsAuth, setButtonsAuth] = useState<React.ReactNode>(null);
  const router = useRouter();

  // outside click for detecting when to close the expanded nav
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowNavExpanded(false));

  useEffect(() => {
    if (!showButtonsAuth) return;
    if (!isLoggedIn(user)) {
      setButtonsAuth(<ButtonsAuth showText />);
    } else {
      setButtonsAuth(<ButtonLogout showText />);
    }
  }, [user]);

  const getClassElevation = () => {
    switch (elevation) {
      case 'none':
        return styles.elevation_none;
      case 'low':
        return styles.elevation_low;
      case 'high':
        return styles.elevation_high;
      case 'rainbow':
        return styles.elevation_rainbow;
    }
  };

  /**
   * RENDER
   */
  return (
    <nav className={classNames(styles.navigation, getClassElevation())} ref={ref}>
      <div className={styles.hamburger}>
        <AiOutlineMenu
          size={40}
          className={styles.iconHamburger}
          onClick={() => {
            setShowNavExpanded(!showNavExpanded);
          }}
        />
      </div>
      <div className={styles.containerBrand} onClick={() => router.push(routeHome)}>
        <div className={styles.brand}>
          {!!imageSrc && <Image src={imageSrc} alt="" height={60} width={70} />}
          <BBText asSpan>{title}</BBText>
        </div>
      </div>
      <div className={classNames(styles.navigationMenu, showNavExpanded && styles.expanded)}>
        <ul className={styles.navigationMenuList}>{children}</ul>
      </div>
      <div className={styles.containerButtonsAuth}>{buttonsAuth}</div>
    </nav>
  );
}
