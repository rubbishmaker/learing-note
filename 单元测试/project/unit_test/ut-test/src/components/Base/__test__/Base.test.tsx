import { describe, vi, it,expect } from 'vitest';
import Base from '../index';
import {render,screen,renderHook,act} from '@testing-library/react'
import '@testing-library/jest-dom';
import {getUrlSearchParams} from "../utils"
import useUpdate from "../hooks/useUpdate";

describe('Base Component', () => {
  it('should render div', async () => {
    //渲染出来了
    render(<Base />);
   const dom =  screen.getByText("我是一个基本测试的组件");
    //断言dom是存在的 这个是拓展配置 从 '@testing-library/jest-dom'; 导入
   expect(dom).toBeInTheDocument();
  });

  it('should return url search params', () => {
    const url = 'https://example.com?name=John&age=30';
    const params = getUrlSearchParams(url);
    expect(params.get('name')).toBe('John');
    expect(params.get('age')).toBe('30');
  });

  it('should update state on useUpdate hook',async () => {
    const { result } = renderHook(() => useUpdate());

    // 初始值
    expect(result.current.state).toBe(0);

    // 第一次调用 update
    act(() => {
      result.current.update();
    });
    expect(result.current.state).toBe(1);

    // 第二次调用 update
    act(() => {
      result.current.update();
    });
    expect(result.current.state).toBe(2);
  });

});

