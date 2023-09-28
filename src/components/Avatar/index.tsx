
/*-- Apply this component styles --*/
import myStyles from '@/components/Avatar/styles/index.module.scss';


type AvatarProps = {
    img: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
};

const Avatar = ({ img, size = 'md' }: AvatarProps) => (
    <div className={`${myStyles['app-avatar-block']} ${myStyles[`app-avatar-${size}`]}`}>
        <img src={img as string} alt='null' />
    </div>
);

export default Avatar;
