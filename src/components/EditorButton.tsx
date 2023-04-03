interface EditorButtonProps {
  children: string | JSX.Element | JSX.Element[] | any;
  active?: boolean;
  disabled?: boolean;
  onClick: () => boolean | void;
}

const EditorButton = ({ children, ...props }: EditorButtonProps) => {
  return (
    <button
      {...props}
      className={
        props.active
          ? "text-base leading-4 rounded bg-gray-300 px-2 py-1 m-0.5 cursor-pointer"
          : "text-base leading-4 rounded bg-gray-100 px-2 py-1 m-0.5 hover:bg-gray-300 cursor-pointer"
      }
    >
      {children}
    </button>
  );
};

export default EditorButton;
