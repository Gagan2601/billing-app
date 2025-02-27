import { render } from '@testing-library/react';

import InventoryLibrary from './inventory-library';

describe('InventoryLibrary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryLibrary />);
    expect(baseElement).toBeTruthy();
  });
});
