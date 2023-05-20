import { render } from '@testing-library/react';
import { TabPane, Tabs } from '../Tabs';

describe('test Tabs', () => {
  test('should match snapshot', () => {
    const { container } = render(
      <Tabs>
        <TabPane>children</TabPane>
      </Tabs>
    );

    expect(container).toMatchSnapshot();
  });
});
