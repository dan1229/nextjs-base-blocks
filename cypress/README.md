# Cypress Component Testing for NextJS Base Blocks

This directory contains the Cypress component testing setup for the NextJS Base Blocks component library. This setup allows you to test React components in isolation without needing a full application setup.

## 🚀 Quick Start

### Running Tests

```bash
# Open Cypress Component Testing UI (recommended for development)
npm run test:open

# Run all component tests headlessly
npm run test

# Run specific component tests
npx cypress run --component --spec "cypress/component/bbbutton.cy.tsx"
```

### Available Scripts

- `npm run test:open` - Opens Cypress UI for interactive component testing
- `npm run test` - Runs all component tests headlessly
- `npm run test:coverage` - Runs tests with code coverage report
- `npm run coverage:report` - Generate coverage reports (text, HTML, LCOV)
- `npm run coverage:open` - Generate HTML coverage report and open in browser
- `npm run cy:open:component` - Alternative command to open component testing UI
- `npm run cy:run:component` - Alternative command to run component tests headlessly

## 📁 Directory Structure

```
cypress/
├── component/           # Component test files
│   ├── bbbutton.cy.tsx
│   ├── bbalert.cy.tsx
│   ├── bbcard.cy.tsx
│   ├── useOutsideClick.cy.tsx  # Hook tests
│   └── ...
├── support/            # Support files and utilities
│   ├── component.ts    # Component testing setup
│   ├── commands.ts     # Custom Cypress commands
│   ├── test-helpers.ts # Testing utilities
│   └── component-index.html
├── fixtures/           # Test data
└── e2e/               # End-to-end tests (future)
```

## 🧪 Writing Component Tests

### Basic Test Structure

```typescript
import ComponentName from '../../src/componentname';

describe('ComponentName Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it('renders with default props', () => {
    cy.mount(<ComponentName>Test content</ComponentName>);
    cy.get('[data-testid="element"]').should('exist');
  });

  it('handles user interactions', () => {
    const onClick = cy.stub();
    cy.mount(<ComponentName onClick={onClick}>Click me</ComponentName>);
    cy.get('button').click();
    cy.then(() => {
      expect(onClick).to.have.been.called;
    });
  });
});
```

### Testing Patterns

#### 1. Props Testing
Test all possible prop combinations:

```typescript
describe('Component Variants', () => {
  const variants = ['primary', 'secondary', 'accent'];
  
  variants.forEach(variant => {
    it(`renders ${variant} variant`, () => {
      cy.mount(<Component variant={variant}>Content</Component>);
      cy.get('.component').should('have.class', variant);
    });
  });
});
```

#### 2. Responsive Testing
Use our helper function to test across viewports:

```typescript
import { testResponsiveViewports } from '../support/test-helpers';

describe('Responsive Behavior', () => {
  testResponsiveViewports(() => {
    cy.mount(<Component>Responsive test</Component>);
  });
});
```

#### 3. Accessibility Testing
Ensure components are accessible:

```typescript
describe('Accessibility', () => {
  it('is keyboard navigable', () => {
    cy.mount(<Component>Accessible content</Component>);
    cy.get('button').focus().should('have.focus');
    cy.get('button').type('{enter}');
  });

  it('has proper ARIA attributes', () => {
    cy.mount(<Component disabled>Content</Component>);
    cy.get('button').should('have.attr', 'aria-disabled', 'true');
  });
});
```

#### 4. Edge Case Testing
Test boundary conditions:

```typescript
import { createTestData } from '../support/test-helpers';

describe('Edge Cases', () => {
  it('handles very long content', () => {
    const longText = createTestData.longText();
    cy.mount(<Component>{longText}</Component>);
    cy.get('.component').should('contain.text', longText);
  });

  it('handles special characters', () => {
    const specialChars = createTestData.specialChars();
    cy.mount(<Component>{specialChars}</Component>);
    cy.get('.component').should('contain.text', specialChars);
  });
});
```

## 🛠 Testing Utilities

### Custom Commands

Located in `cypress/support/commands.ts`:

- `cy.checkA11y()` - Basic accessibility checks
- `cy.testResponsive()` - Responsive behavior testing
- `cy.checkStyles(element, expectedClass)` - CSS class verification

### Test Helpers

Located in `cypress/support/test-helpers.ts`:

- `testResponsiveViewports()` - Test across different screen sizes
- `createTestData` - Generate test data (long text, special chars, etc.)
- `VIEWPORTS` - Predefined viewport configurations

### Data Generation

```typescript
import { createTestData } from '../support/test-helpers';

// Generate test data
const longText = createTestData.longText();
const specialChars = createTestData.specialChars();
const listItems = createTestData.numberedList(5);
```

## 📋 Component Testing Checklist

For each component, ensure you test:

- [ ] **Basic Rendering**: Default props, custom className
- [ ] **All Props**: Each prop with different values
- [ ] **Variants**: All visual variants (colors, sizes, etc.)
- [ ] **Interactions**: Click handlers, form submissions
- [ ] **States**: Loading, disabled, error states
- [ ] **Content**: Text, JSX, complex nested content
- [ ] **Responsive**: Mobile, tablet, desktop viewports
- [ ] **Accessibility**: Keyboard navigation, ARIA attributes
- [ ] **Edge Cases**: Empty content, very long content, special characters

## 📋 Hook Testing Checklist

For each custom hook, ensure you test:

- [ ] **Basic Functionality**: Core hook behavior works as expected
- [ ] **Edge Cases**: Null refs, invalid parameters, boundary conditions
- [ ] **Multiple Scenarios**: Different parameter combinations
- [ ] **Event Handling**: Proper event listener behavior
- [ ] **Responsive**: Works across different viewport sizes
- [ ] **Performance**: Multiple rapid calls, cleanup behavior
- [ ] **Integration**: Hook works properly with React lifecycle

## 📊 Code Coverage

This project includes comprehensive code coverage reporting using Istanbul/NYC and Cypress Code Coverage.

### Coverage Reports

Coverage data is automatically collected during test runs and reports are generated in multiple formats:

- **Text Summary**: Console output during test runs
- **HTML Report**: Interactive web interface at `coverage/index.html`
- **LCOV Report**: For integration with code coverage services like Codecov

### Viewing Coverage

```bash
# Run tests with coverage
npm run test:coverage

# Generate and view HTML report
npm run coverage:open

# Generate all report formats
npm run coverage:report
```

### Coverage Configuration

- **NYC Config**: `.nyc.config.js` - Controls coverage collection and reporting
- **Babel Config**: `.babelrc` - Includes Istanbul instrumentation
- **Cypress Config**: `cypress.config.ts` - Enables coverage collection for component tests

Coverage excludes test files, configuration files, and non-source code to focus on actual component code quality.

## 🔧 Configuration

### Cypress Config (`cypress.config.ts`)
- Framework: Next.js with Webpack
- Viewport: 1280x720 (configurable per test)
- Video recording: Disabled for faster runs
- Screenshots: On failure only
- Code Coverage: Enabled with Istanbul instrumentation

### Support Files
- `component.ts`: Main component testing setup with coverage support
- `component-index.html`: HTML template with CSS variables
- `commands.ts`: Custom Cypress commands

## 📝 Best Practices

### 1. Test Organization
- Group related tests with `describe` blocks
- Use descriptive test names
- Test one thing per `it` block

### 2. Selectors
- Prefer `data-testid` attributes for stable selectors
- Use semantic selectors when possible (`button`, `input`, etc.)
- Avoid CSS class selectors that might change

### 3. Assertions
- Be specific with assertions (`contain.text` vs `contain`)
- Test both positive and negative cases
- Use meaningful error messages

### 4. Performance
- Reset viewport in `beforeEach` if needed
- Clean up after tests that modify global state
- Use stubs for external dependencies

## 🐛 Troubleshooting

### Common Issues

1. **Component not rendering**
   - Check import paths
   - Ensure all required props are provided
   - Verify CSS imports

2. **Timeout errors**
   - Increase viewport wait times
   - Check for asynchronous operations
   - Ensure elements exist before interaction

3. **TypeScript errors**
   - Verify component prop interfaces
   - Check import statements
   - Ensure Cypress types are installed

### Debug Tips

```typescript
// Add debug breakpoint
cy.debug();

// Log element information
cy.get('.element').then($el => {
  console.log($el);
});

// Take screenshot for debugging
cy.screenshot('debug-screenshot');
```

## 🪝 Testing Custom Hooks

Custom hooks like `useOutsideClick` can be tested by creating wrapper components that use the hooks. This approach allows you to test hook behavior through component interactions.

### Hook Testing Pattern

```typescript
import useOutsideClick from '../../src/utils/hooks/UseOutsideClick';

// Create a test component that uses the hook
const TestComponent: React.FC = () => {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setTriggered(true);
  });

  return (
    <div>
      <div ref={ref} data-testid="inside">Inside Element</div>
      <div data-testid="outside">Outside Element</div>
      <div data-testid="status">Triggered: {triggered ? 'Yes' : 'No'}</div>
    </div>
  );
};

describe('useOutsideClick Hook Tests', () => {
  it('should trigger callback when clicking outside', () => {
    cy.mount(<TestComponent />);
    
    cy.get('[data-testid="outside"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Triggered: Yes');
  });

  it('should NOT trigger when clicking inside', () => {
    cy.mount(<TestComponent />);
    
    cy.get('[data-testid="inside"]').click();
    cy.get('[data-testid="status"]').should('contain', 'Triggered: No');
  });
});
```

### Hook Testing Guidelines

1. **Create Wrapper Components**: Always test hooks through components that use them
2. **Test All Scenarios**: Cover both success and failure cases
3. **Test Edge Cases**: Handle null refs, rapid clicks, nested elements
4. **Use Stubs**: Mock external dependencies when needed
5. **Responsive Testing**: Ensure hooks work across different viewport sizes

### Available Hook Tests

- `useOutsideClick.cy.tsx` - Tests for the outside click detection hook

## 🚀 Next Steps

1. **Add More Components**: Create test files for remaining components
2. **Visual Testing**: Consider adding screenshot comparison tests
3. **Performance Testing**: Add performance benchmarks
4. **E2E Tests**: Extend to full application testing
5. **CI/CD Integration**: Add tests to your build pipeline

## 📚 Resources

- [Cypress Component Testing Docs](https://docs.cypress.io/guides/component-testing/overview)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [React Testing Patterns](https://docs.cypress.io/guides/component-testing/react/overview) 