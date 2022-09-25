import React, { useEffect, useLayoutEffect } from 'react';
import CommonLayout from '@/common/CommonLayout';
import styles from './index.module.less';
import img_1 from '@/static/images/1.jpg';

export default function UserDetail(props: any) {
  const editorRef: any = React.useRef();

  useLayoutEffect(() => {
    console.log(editorRef.current);
  }, []);

  const handleClick = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const { startContainer, startOffset, endContainer, endOffset } = range!;
    if (startContainer.nodeType === 1) {
      range?.setStart(startContainer, startOffset - 1);
    } else if (startContainer.nodeType === 3) {
      range?.setStart(startContainer, 0);
    }
    if (endContainer.nodeType === 1) {
      range?.setEnd(endContainer, endOffset + 1);
    } else if (endContainer.nodeType === 3) {
      range?.setEnd(endContainer, (endContainer as any).length);
    }
  }

  const handleInsertImage = () => {
    const selection = window.getSelection();
    const range = selection!.getRangeAt(0);
    if (!range.collapsed) range.deleteContents();
    const div = document.createElement('div');
    div.innerHTML = '我是谁12345678';
    range.insertNode(div);
  }

  const handleBG = () => {
    const selection = window.getSelection();
    const range = selection!.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement('span');
    span.style.background = '#f80';
    range.surroundContents(span);
  }

  return (
    <CommonLayout>
      <div className={styles.editor_box} contentEditable="true" ref={editorRef}>
        1234567890<div>hello world</div>
      </div>
      <button onClick={handleClick}>确定</button>
      <button onClick={handleInsertImage}>插入图片</button>
      <button onClick={handleBG}>背景</button>
    </CommonLayout>
  );
}
