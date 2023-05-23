import styles from '@/base_blocks/src/bbmodal/styles.module.scss';
import BBCard from '@/base_blocks/src/bbcard';
import BBButton from '@/base_blocks/src/bbbutton';
import BBText from '@/base_blocks/src/bbtext';
import { AiOutlineClose } from 'react-icons/ai';

/**
 * PROPS
 *
 * @param {React.ReactNode} children - The text to display
 * @param {string} title - The title of the modal
 * @param {() => void=} onDismiss - The function to call when the modal is dismissed
 * @param {() => void=} onCancel - The function to call when the modal is cancelled
 * @param {string=} textCancel - The text to display on the cancel button
 * @param {() => void=} onConfirm - The function to call when the modal is confirmed
 * @param {string=} textConfirm - The text to display on the confirm button
 * @param {React.ReactNode=} extraFooter - Extra footer content
 */
interface IPropsBBModal {
  children: React.ReactNode;
  title: string;
  onDismiss?: () => void;
  onCancel?: () => void;
  textCancel?: string;
  onConfirm?: () => void;
  textConfirm?: string;
  extraFooter?: React.ReactNode;
}

/**
 * BBModal
 */
export default function BBModal(Props: IPropsBBModal): React.ReactElement {
  const { children, title, onDismiss, onCancel, textCancel = 'Cancel', onConfirm, textConfirm = 'Confirm', extraFooter } = Props;
  const showFooter = !!onConfirm || !!onCancel || !!extraFooter;
  /**
   * RENDER
   */
  return (
    <div className={styles.containerModal}>
      <BBCard className={styles.modal}>
        <BBCard.Header>
          <BBCard.Header>
            <div className={styles.headerRow}>
              <BBText size="xxlarge">{title}</BBText>
              {!!onDismiss && <BBButton onClick={onDismiss} variant="danger" icon={{ icon: <AiOutlineClose /> }} />}
            </div>
          </BBCard.Header>
        </BBCard.Header>
        <BBCard.Body className={styles.bodyModal}>{children}</BBCard.Body>
        {showFooter && (
          <BBCard.Footer>
            <div className={styles.containerButtons}>
              {!!onConfirm && <BBButton onClick={onConfirm} text={textConfirm} variant="success" />}
              {!!onCancel && <BBButton onClick={onCancel} text={textCancel} variant="danger" />}
              {extraFooter}
            </div>
          </BBCard.Footer>
        )}
      </BBCard>
    </div>
  );
}
