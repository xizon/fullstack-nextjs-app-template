/* 
 *************************************
 * <!-- Modal -->
 *************************************
 */

/*-- Apply this component styles --*/
import myStyles from '@/components/Modal/styles/index.module.scss';

type CallbackFnType = () => void;
type DetailFnType = (arg: any) => void;

type ModalProps = {
  modalId: string;
  targetId: number;
  show?: boolean;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  showClickEvent?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | CallbackFnType | any;
  closeClickEvent?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | CallbackFnType | any;
  /** The method to call when a page is clicked. Exposes the current ID as an argument. */
  gotoIdClickEvent?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | DetailFnType | any;
};


export default function Modal(props: ModalProps) {

  const {
    show,
    modalId,
    targetId,
    title,
    content,
    showClickEvent,
    closeClickEvent,
    gotoIdClickEvent
  } = props;


  function handleShow(e) {
    e.preventDefault();

    if ( typeof gotoIdClickEvent === 'function' ) {
      gotoIdClickEvent(targetId);
    }

    if ( typeof showClickEvent === 'function' ) {
      showClickEvent();
    }

  }


  function handleClose(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( typeof closeClickEvent === 'function' ) {
      closeClickEvent();
    }
  }



  return (
    <>

      <a className={myStyles['modal-trigger']} href="#" onClick={handleShow}>{title}</a>

      <div
        id={modalId}
        className={myStyles['modal']}
        onClick={handleClose}
        style={{ display: show ? 'flex' : 'none' }}>

        <div className={myStyles['modal-content']} onClick={(e) => e.stopPropagation()}>
          <a href="#"
            className={myStyles['modal-close']}
            onClick={handleClose}>&times;
          </a>

          <div className={myStyles['modal-flex']}>
            <div>{content}</div>
          </div>

        </div>

      </div>

    </>
  )

}

