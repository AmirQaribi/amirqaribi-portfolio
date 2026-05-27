import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntroSlide } from '../presentation/components/slides/IntroSlide';

describe('IntroSlide', () => {
  it('calls onNext when the CTA is clicked while active', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();

    render(<IntroSlide isActive={true} onNext={onNext} />);
    await user.click(screen.getByRole('button', { name: /yes, i am/i }));

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('renders as inactive via classes (opacity-0 + pointer-events-none)', () => {
    const onNext = vi.fn();

    const { container } = render(<IntroSlide isActive={false} onNext={onNext} />);
    expect(container.firstElementChild).toHaveClass('opacity-0');
    expect(container.firstElementChild).toHaveClass('pointer-events-none');
  });
});

