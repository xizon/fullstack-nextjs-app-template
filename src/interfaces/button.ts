export interface ButtonStylesConfig {
    info?: {
        [key: string]: string | undefined;
    };
    success?: {
        [key: string]: string | undefined;
    };
    danger?: {
        [key: string]: string | undefined;
    };
    warning?: {
        [key: string]: string | undefined;
    };
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<any> {
    bgColor?: string;
    btnName?: string | React.ReactNode;
    href?: string;
};
