import classnames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import BBLink from '../bblink'
import styles from '../bbnavbar_item/styles.module.scss'

function removeSlashes (str: string | undefined) {
  if (!str) return ''
  const res = str.endsWith('/') ? str.slice(0, -1) : str
  return res.startsWith('/') ? res.slice(1) : res
}

/**
 * PROPS
 *
 * @param {string} title - Title to use for item.
 * @param {string} href - Href to use for item.
 * @param {string=} className - Any class name to add.
 * @param {React.ReactElement=} children - Children to render.
 */
interface IPropsBBNavbarItem {
  title: string
  href: string
  className?: string
  children?: React.ReactElement[]
}

/**
 * BBNAVBAR ITEM
 */
export default function BBNavbarItem (Props: IPropsBBNavbarItem): React.ReactElement {
  const { title, href, className, children } = Props
  const router = useRouter()
  const [isActiveInDropdown, setIsActiveInDropdown] = useState(false)

  useEffect(() => {
    let found = false
    children?.forEach((child) => {
      if (removeSlashes(window.location.pathname) === removeSlashes(child.props.href)) {
        found = true
      }
    })
    setIsActiveInDropdown(found)
  }, [children, window.location.pathname])

  if (!router.isReady) {
    return <></>
  }
  const urlMatch = !!router.asPath.length && !!href.length && removeSlashes(router.asPath) === removeSlashes(href)
  const isActive = urlMatch || isActiveInDropdown

  /**
   * RENDER
   */
  return (
    <li
      id={`nav-item-${title.toLowerCase()}`}
      className={classnames(styles.navbarItemBase, styles.dropdownContainer, isActive ? styles.active : '', className)}
    >
      <div className={styles.navbarContentContainer}>
        <div className={styles.navbarHeaderContainer}>
          <BBLink href={href} color={isActive ? 'white' : 'secondary'}>
            {title}
          </BBLink>
          {!!children && <IoMdArrowDropdown size={30} className={styles.iconDropdown} />}
        </div>
        {!!children && <ul className={styles.dropdownContent}>{children}</ul>}
      </div>
    </li>
  )
}
