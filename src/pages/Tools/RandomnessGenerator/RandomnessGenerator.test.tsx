import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import RandomnessGenerator, { ANIMATION_DURATION } from '.';

const NUMBER_OF_COMPUTATIONS = 20;

vi.useFakeTimers();

const renderComponent = () =>
  render(
    <ChakraProvider>
      <RandomnessGenerator />
    </ChakraProvider>
  );

describe('RandomnessGenerator', () => {
  it('renders an initial result on mount', () => {
    renderComponent();
    const result = screen.getByTestId('result');
    expect(result).toBeInTheDocument();
  });

  it('clicking Compute triggers a DOM update (value may stay the same)', () => {
    renderComponent();
    const computeButton = screen.getByRole('button', { name: /compute/i });

    for (let i = 0; i < NUMBER_OF_COMPUTATIONS; i += 1) {
      fireEvent.click(computeButton);

      act(() => {
        vi.advanceTimersByTime(ANIMATION_DURATION);
      });
      const resultEl = screen.getByTestId('result');
      if (!resultEl) throw new Error('Result element not found');

      expect(resultEl).toBeInTheDocument();
      expect(resultEl.innerHTML).toBeTruthy();
    }
  });

  it('clicking presets multiple times updates result within range', () => {
    renderComponent();

    const d6Button = screen.getByRole('button', { name: /d6/i });

    fireEvent.click(d6Button);
    act(() => vi.advanceTimersByTime(ANIMATION_DURATION));

    let value = Number(screen.getByTestId('result').textContent);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(6);

    for (let i = 0; i < NUMBER_OF_COMPUTATIONS; i += 1) {
      fireEvent.click(d6Button);
      act(() => vi.advanceTimersByTime(ANIMATION_DURATION));

      value = Number(screen.getByTestId('result').textContent);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it('changing min and max values then computing respects bounds', () => {
    renderComponent();

    const minInput = screen.getByLabelText(/min value/i);
    const maxInput = screen.getByLabelText(/max value/i);
    const computeButton = screen.getByRole('button', { name: /compute/i });

    fireEvent.change(minInput, { target: { value: '10' } });
    fireEvent.change(maxInput, { target: { value: '15' } });

    for (let i = 0; i < NUMBER_OF_COMPUTATIONS; i += 1) {
      fireEvent.click(computeButton);
      act(() => vi.advanceTimersByTime(ANIMATION_DURATION));

      const value = Number(screen.getByTestId('result').textContent);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(15);
    }
  });

  it('loading indicator is shown during computation', () => {
    renderComponent();

    const computeButton = screen.getByRole('button', { name: /compute/i });
    fireEvent.click(computeButton);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(ANIMATION_DURATION));

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
