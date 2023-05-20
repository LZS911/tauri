import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { renderWithRouter } from '../../../testUtils/customRender';
import NotFound from '../NotFound';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('test NotFound', () => {
  const useNavigateMock: jest.Mock = useNavigate as jest.Mock;
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should match snapshot', () => {
    const { container } = renderWithRouter(<NotFound />);
    expect(container).toMatchSnapshot();
  });

  test('should jump to targetPath when clicking backHome button', async () => {
    renderWithRouter(<NotFound />);
    expect(navigateMock).toBeCalledTimes(0);
    fireEvent.click(screen.getByText('anomaly.notFound.backToHome'));
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toBeCalledWith('/dashboard');
  });
});
