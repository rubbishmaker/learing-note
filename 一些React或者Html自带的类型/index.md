## React的setState 
React.Dispatch<React.SetStateAction<User>>

React 节点类型
// ReactNode 可以表示任何可以渲染的内容
type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;

## React事件类型
// 点击事件
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;

// 表单事件
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;

// 键盘事件
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;

// 使用示例
const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  console.log('Button clicked', event.currentTarget);
};

const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  console.log('Form submitted');
};

const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed');
  }
};

// 基本合成事件
interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

// 使用示例
function handleEvent(event: React.SyntheticEvent) {
  console.log('Event triggered', event.currentTarget);
}

// 拖拽事件
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;

// 焦点事件
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;

// 变更事件
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;

// 使用示例
const handleDrag: React.DragEventHandler<HTMLDivElement> = (event) => {
  console.log('Element dragged', event.dataTransfer);
};

const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
  console.log('Input focused', event.target);
};

const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  console.log('Input value changed', event.target.value);
};

// useRef 类型
interface RefObject<T> {
  readonly current: T | null;
}
interface MutableRefObject<T> {
  current: T;
}

// 使用示例
const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef<number>(0); // 不会触发重新渲染的值
