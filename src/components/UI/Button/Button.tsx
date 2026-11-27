import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  type?: 'submit';
}

const Button: FC<ButtonProps> = ({ type, children, ...props }) => {
  const { disabled } = props;

  return (
    <button
      {...props}
      className={`mx-1 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        disabled && 'cursor-not-allowed opacity-60'
      }`}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
