import BBButton from '../../src/bbbutton';

describe('BBButton Component', () => {
  it('renders with default props', () => {
    cy.mount(<BBButton text="Click me" />);
    cy.get('button').should('exist');
    cy.get('button').should('contain.text', 'Click me');
  });

  it('renders with primary variant', () => {
    cy.mount(<BBButton text="Primary" variant="primary" />);
    cy.get('button').should('contain.text', 'Primary');
  });

  it('renders with secondary variant', () => {
    cy.mount(<BBButton text="Secondary" variant="secondary" />);
    cy.get('button').should('contain.text', 'Secondary');
  });

  it('handles click events', () => {
    const onClick = cy.stub();
    cy.mount(<BBButton text="Clickable" onClick={onClick} />);

    cy.get('button').click();
    cy.then(() => {
      expect(onClick).to.have.been.called;
    });
  });

  it('handles disabled state', () => {
    cy.mount(<BBButton text="Disabled" disabled={true} />);
    cy.get('button').should('be.disabled');
  });

  it('applies custom className', () => {
    cy.mount(<BBButton text="Custom" className="custom-class" />);
    cy.get('button').should('have.class', 'custom-class');
  });

  it('handles different button types', () => {
    cy.mount(<BBButton text="Submit" type="submit" />);
    cy.get('button').should('have.attr', 'type', 'submit');
  });

  describe('Icon Alignment', () => {
    it('renders icon on the left by default', () => {
      cy.mount(
        <BBButton
          text="Left Icon"
          icon={{ icon: '→', align: 'left' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Left Icon');
      cy.get('button').should('contain.text', '→');
    });

    it('renders icon on the right when align is "right"', () => {
      cy.mount(
        <BBButton
          text="Right Icon"
          icon={{ icon: '→', align: 'right' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Right Icon');
      cy.get('button').should('contain.text', '→');
    });

    it('renders icon with space-between alignment', () => {
      cy.mount(
        <BBButton
          text="Space Between"
          icon={{ icon: '→', align: 'space-between' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Space Between');
      cy.get('button').should('contain.text', '→');
    });

    it('renders icon above text when align is "above"', () => {
      cy.mount(
        <BBButton
          text="Above Icon"
          icon={{ icon: '↑', align: 'above' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Above Icon');
      cy.get('button').should('contain.text', '↑');
    });

    it('renders icon below text when align is "below"', () => {
      cy.mount(
        <BBButton
          text="Below Icon"
          icon={{ icon: '↓', align: 'below' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Below Icon');
      cy.get('button').should('contain.text', '↓');
    });

    it('renders icon with href (link button)', () => {
      cy.mount(
        <BBButton
          text="Link Icon"
          href="#test"
          icon={{ icon: '→', align: 'right' }}
        />
      );
      cy.get('a').should('exist');
      cy.get('a').should('have.attr', 'href', '#test');
      cy.get('a').should('contain.text', 'Link Icon');
      cy.get('a').should('contain.text', '→');
    });

    it('renders icon with custom color', () => {
      cy.mount(
        <BBButton
          text="Colored Icon"
          icon={{ icon: '★', align: 'left', color: 'primary' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Colored Icon');
      cy.get('button').should('contain.text', '★');
    });

    it('handles button without icon gracefully', () => {
      cy.mount(<BBButton text="No Icon" />);
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'No Icon');
      cy.get('button').should('not.contain.text', '→');
    });

    it('handles empty icon gracefully', () => {
      cy.mount(
        <BBButton
          text="Empty Icon"
          icon={{ icon: null, align: 'left' }}
        />
      );
      cy.get('button').should('exist');
      cy.get('button').should('contain.text', 'Empty Icon');
      cy.get('button').should('not.contain.text', '→');
    });
  });
});
