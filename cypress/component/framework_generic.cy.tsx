import React from 'react';
import { configureBaseBlocks } from '../../src/framework/generic/config';
import Image from '../../src/framework/generic/image';
import Link from '../../src/framework/generic/link';
import { useNavigate, usePathname } from '../../src/framework/generic/navigation';
import type { IPropsFrameworkImage, IPropsFrameworkLink } from '../../src/framework/types';

function PathnameProbe(): React.ReactElement {
  const pathname = usePathname();
  return <span data-cy="pathname">{pathname === null ? 'null' : pathname}</span>;
}

function NavigateProbe(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <button data-cy="navigate" onClick={() => navigate('/target')}>
      go
    </button>
  );
}

describe('Generic framework primitives', () => {
  // The registry is module state, so every test starts from nothing registered.
  beforeEach(() => {
    configureBaseBlocks({ Link: undefined, Image: undefined, useNavigate: undefined, usePathname: undefined });
  });

  describe('Nothing registered', () => {
    it('renders Link as a plain anchor', () => {
      cy.mount(
        <Link href="/plain" className="link-class" target="_blank" rel="noreferrer noopener">
          Plain
        </Link>
      );
      cy.get('a')
        .should('have.attr', 'href', '/plain')
        .and('have.class', 'link-class')
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noreferrer noopener');
    });

    it('leaves empty target and rel off the anchor', () => {
      cy.mount(
        <Link href="/plain" target="" rel="">
          Plain
        </Link>
      );
      cy.get('a').should('not.have.attr', 'target');
      cy.get('a').should('not.have.attr', 'rel');
    });

    it('forwards onClick to the anchor', () => {
      const onClick = cy.stub().as('onClick');
      cy.mount(
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onClick();
          }}
        >
          Plain
        </Link>
      );
      cy.get('a').click();
      cy.get('@onClick').should('have.been.calledOnce');
    });

    it('renders Image as a plain img', () => {
      cy.mount(<Image src="/logo.png" alt="logo" height={40} width={50} />);
      cy.get('img')
        .should('have.attr', 'src', '/logo.png')
        .and('have.attr', 'alt', 'logo')
        .and('have.attr', 'height', '40')
        .and('have.attr', 'width', '50');
    });

    it('returns a null pathname', () => {
      cy.mount(<PathnameProbe />);
      cy.get('[data-cy="pathname"]').should('have.text', 'null');
    });
  });

  describe('Host registered', () => {
    it('renders the registered Link', () => {
      const HostLink = ({ href, children }: IPropsFrameworkLink) => (
        <a href={href} data-cy="host-link">
          {children}
        </a>
      );
      configureBaseBlocks({ Link: HostLink });
      cy.mount(<Link href="/host">Host</Link>);
      cy.get('[data-cy="host-link"]').should('have.attr', 'href', '/host').and('have.text', 'Host');
    });

    it('renders the registered Image', () => {
      const HostImage = ({ src, alt }: IPropsFrameworkImage) => <img src={src} alt={alt} data-cy="host-image" />;
      configureBaseBlocks({ Image: HostImage });
      cy.mount(<Image src="/logo.png" alt="logo" />);
      cy.get('[data-cy="host-image"]').should('have.attr', 'src', '/logo.png');
    });

    it('returns the registered pathname', () => {
      configureBaseBlocks({ usePathname: () => '/from-host' });
      cy.mount(<PathnameProbe />);
      cy.get('[data-cy="pathname"]').should('have.text', '/from-host');
    });

    it('navigates through the registered hook', () => {
      const navigate = cy.stub().as('navigate');
      configureBaseBlocks({ useNavigate: () => navigate });
      cy.mount(<NavigateProbe />);
      cy.get('[data-cy="navigate"]').click();
      cy.get('@navigate').should('have.been.calledOnceWith', '/target');
    });
  });
});
