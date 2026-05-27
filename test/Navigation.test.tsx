import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '../presentation/components/ui/Navigation';

describe('Navigation', () => {
  it('renders one button per slide with accessible labels', () => {
    render(<Navigation totalSlides={4} currentSlide={0} onSelect={() => {}} />);

    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 4')).toBeInTheDocument();
  });

  it('marks the current slide as active via className', () => {
    render(<Navigation totalSlides={3} currentSlide={1} onSelect={() => {}} />);

    expect(screen.getByLabelText('Go to slide 2')).toHaveClass('bg-fluent-accent');
    expect(screen.getByLabelText('Go to slide 1')).toHaveClass('bg-white/10');
  });

  it('calls onSelect with the clicked index', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<Navigation totalSlides={3} currentSlide={0} onSelect={onSelect} />);
    await user.click(screen.getByLabelText('Go to slide 3'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});

