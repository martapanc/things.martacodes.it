import clsx from 'clsx';

export interface BurgerIconProps {
    isOpen: boolean;
}

const BurgerIcon = ({ isOpen }: BurgerIconProps) => {
    return (
        <div
            className={clsx('burger-icon', {
                open: isOpen,
            })}
        >
            <span />
            <span />
            <span />
            <span />
        </div>
    );
};

export { BurgerIcon };
