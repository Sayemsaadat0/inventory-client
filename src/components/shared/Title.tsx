import { FC } from 'react';
import clsx from 'clsx';

type TitleProps = {
  title?: string;
  className?: string; // Allow custom class names for overriding
};

const Title: FC<TitleProps> = ({ title, className }) => {
  return (
    <div
      className={clsx(
        "text-xl leckerli-one-regular bg-white p-2 text-black", // Default classes
        className // Custom class overrides from props
      )}
    >
      {title}
    </div>
  );
};

export default Title;
