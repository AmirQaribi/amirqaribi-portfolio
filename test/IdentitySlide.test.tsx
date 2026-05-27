import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IdentitySlide } from '../presentation/components/slides/IdentitySlide';
import { content } from '../core/domain/content';

describe('IdentitySlide', () => {
  it('renders a mailto link for the email', () => {
    render(<IdentitySlide isActive={true} data={content.identity} />);

    const emailLink = screen.getByRole('link', { name: content.identity.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${content.identity.email}`);
  });
});

