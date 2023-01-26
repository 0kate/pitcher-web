import { useMemo, FunctionComponent, ReactNode } from 'react';

type Props = {
  type: 'submit' | 'reset';
  color: 'primary' | 'secondary';
  children: ReactNode;
};

const Button: FunctionComponent<Props> = ({
  type,
  color,
  children,
}: Props) => {
  const classNames = useMemo(() => {
    const classNames = ['py-2', 'px-4', 'rounded'];

    switch (color) {
      case 'primary':
        classNames.push('bg-blue-500');
        classNames.push('hover:bg-blue-700');
        classNames.push('text-white');
        break;
      case 'secondary':
        classNames.push('hover:bg-grey-700');
        classNames.push('text-black');
        break;
      default:
        classNames.push('hover:bg-white-700');
        classNames.push('text-black');
        break;
    }

    return classNames;
  }, [color]);

  return (
    <button className={classNames.join(' ')} type={type}>
      {children}
    </button>
  );
};

export default Button;
