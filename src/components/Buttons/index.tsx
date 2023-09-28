/* 
 *************************************
 * <!-- Button -->
 *************************************
 */

/*-- Apply this component styles --*/
import myStyles from '@/components/Buttons/styles/index.module.scss';

import { ButtonStylesConfig, ButtonProps } from '@/interfaces/button';

const styles: ButtonStylesConfig = {
  info: {
    backgroundColor: '#38c9ff',
    color: 'white'
  },
  success: {
    backgroundColor: '#16c900',
    color: 'white'
  },
  danger: {
    backgroundColor: '#ff2222',
    color: 'white'
  },
  warning: {
    backgroundColor: '#dfa22f',
    color: 'white'
  }
};

export default function Button(props: ButtonProps) {

  const {
    bgColor,
    btnName,
    href,
    ...attributes
  } = props;


  return (
    <>

      {href ? (
        <a className={myStyles['button']} style={styles[bgColor!] || {}} href={href} {...attributes}>
          {btnName || 'Default'}
        </a>
      ) : (
        <button type="button" className={myStyles['button']} style={styles[bgColor!] || {}} {...attributes}>
          {btnName || 'Default'}
        </button>
      )}

    </>
  )

}
