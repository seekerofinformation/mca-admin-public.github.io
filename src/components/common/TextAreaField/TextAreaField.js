import React, { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './TextAreaField.module.scss';

const TextAreaField = memo((props) => {
  const { autoHeight, modifiers, ...rest} = props;
  const textAreaRef = useRef(null);

  useEffect(() => {
    if(autoHeight && textAreaRef.current){
      textAreaRef.current.style.setProperty('height', 'auto');
      textAreaRef.current.style.setProperty('height', `${textAreaRef.current.scrollHeight - 20}px`)
    }
  }, [autoHeight, textAreaRef.current?.scrollHeight]);

  return (
    <textarea
      {...rest}
      ref={textAreaRef}
      className={clsx(styles.textArea, modifiers, {
        [styles.hideScroll]: autoHeight
      })}
    />
  );
});

export default TextAreaField;
