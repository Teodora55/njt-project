import React, { useRef, useImperativeHandle, useState } from "react";

const Input = React.forwardRef((props, ref) => {
  const [input, setInput] = useState(props.value);
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return { inputValue: input };
  });

  return (
    <div>
      <label>{props.label}</label>{" "}
      <input
        ref={inputRef}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={input}
        onChange={() => {
          setInput(inputRef.current.value);
        }}
      />
    </div>
  );
});

export default Input;
