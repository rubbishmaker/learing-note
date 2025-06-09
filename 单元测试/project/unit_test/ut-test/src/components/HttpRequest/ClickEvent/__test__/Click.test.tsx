import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import EventClick from '../index'; // 假设你的组件路径是正确的
import '@testing-library/jest-dom';

describe('HttpRequest 组件', () => {
  it('点击事件的mock', async () => {
    const user = userEvent.setup();
    render(<EventClick />);
    user.click(screen.getByRole('button'));

    const dom = await screen.findByText('按钮已被点击');

    expect(dom).toBeInTheDocument();
  });
});
