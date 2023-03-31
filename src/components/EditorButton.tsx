interface ButtonProps {
  children: string;
  active?: boolean;
  onClick: () => boolean;
}

const EditorButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        props.active
          ? "rounded bg-gray-300 px-2 py-1 m-1 cursor-pointer"
          : "rounded bg-gray-100 px-2 py-1 m-1 hover:bg-gray-300 cursor-pointer"
      }
    >
      {children}
    </button>
  );
};

export default EditorButton;
