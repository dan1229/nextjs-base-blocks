import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import BBButton from '../bbbutton';
import BBCard from '../bbcard';
import styles from '../bbmodal/styles.module.scss';
import BBText from '../bbtext';

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
 * @param {boolean=} confirmCancel - Whether to show the cancel button
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
  confirmCancel?: boolean;
}

/**
 * BBModal
 */
export default function BBModal(Props: IPropsBBModal): React.ReactElement {
  const { children, title, onDismiss, onCancel, textCancel = 'Cancel', onConfirm, textConfirm = 'Confirm', extraFooter, confirmCancel = false } = Props;
  const showFooter = !!onConfirm || !!onCancel || !!extraFooter;

  let onCancelRes = onCancel
  if (confirmCancel) {
    onCancelRes = () => {
      if (window.confirm('Are you sure you want to cancel?')) {
        onCancel && onCancel()
      }
    }
  }

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
              {!!onCancelRes && <BBButton onClick={onCancelRes} text={textCancel} variant="danger" />}
              {extraFooter}
            </div>
          </BBCard.Footer>
        )}
      </BBCard>
    </div>
  );
}
