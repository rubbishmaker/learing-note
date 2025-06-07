import { findByText, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HttpRequest from '../index';
import axios from 'axios';
import '@testing-library/jest-dom';
// 模拟 axios
vi.mock('axios');

describe('HttpRequest 组件', () => {
  it('渲染基础内容并请求数据', async () => {
    // 设置 axios.get 的模拟返回值
    vi.mocked(axios.get).mockResolvedValue({ data: { msg: 'hello' } });

    render(<HttpRequest />);

    // 检查基础文本
    expect(screen.getByText('我是测试请求的组件')).toBeInTheDocument();

    const dom = await screen.findByText("hello")
    expect(dom).toBeInTheDocument();

    // 检查 axios.get 是否被调用
    expect(axios.get).toHaveBeenCalledWith('localhost:8777/getData');
  });
});