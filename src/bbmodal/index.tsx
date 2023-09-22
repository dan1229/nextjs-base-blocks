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
 * @param {(args?: unknown) => void=} onDismiss - The function to call when the modal is dismissed
 * @param {string=} textCancel - The text to display on the cancel button
 * @param {(args?: unknown) => void=} onConfirm - The function to call when the modal is confirmed
 * @param {string=} textConfirm - The text to display on the confirm button
 * @param {React.ReactNode=} extraFooter - Extra footer content
 * @param {boolean=} confirmCancel - Whether to show the cancel button
 * @param {boolean=} outsideClickCloses - Whether to close the modal when clicking outside of it, calls onDismiss function
 */
interface IPropsBBModal {
  children: React.ReactNode;
  title: string;
  onDismiss?: (args?: any) => void;
  textDismiss?: string;
  onConfirm?: (args?: any) => void;
  textConfirm?: string;
  extraFooter?: React.ReactNode;
  confirmCancel?: boolean;
  outsideClickCloses?: boolean;
}

/**
 * BBModal
 */
export default function BBModal(Props: IPropsBBModal): React.ReactElement {
  const { children, title, onDismiss, textDismiss = 'Cancel', onConfirm, textConfirm = 'Confirm', extraFooter, confirmCancel = false, outsideClickCloses = true } = Props;
  const showFooter = !!onConfirm || !!onDismiss || !!extraFooter;

  let onDismissRes = onDismiss
  if (confirmCancel) {
    onDismissRes = () => {
      if (window.confirm('Are you sure you want to cancel?')) {
        onDismiss && onDismiss()
      }
    }
  }

  // outside click for detecting when to close
  const onClickContainer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      if (outsideClickCloses) {
        onDismissRes && onDismissRes();
      }
    }
    e.stopPropagation();
  };


  /**
   * RENDER
   */
  return (
    <div className={styles.containerModal} onClick={onClickContainer}>
      <BBCard className={styles.modal}>
        <BBCard.Header>
          <BBCard.Header>
            <div className={styles.headerRow}>
              <BBText size="xxlarge">{title}</BBText>
              {!!onDismissRes && <BBButton onClick={onDismissRes} variant="danger" icon={{ icon: <AiOutlineClose /> }} />}
            </div>
          </BBCard.Header>
        </BBCard.Header>
        <BBCard.Body className={styles.bodyModal}>{children}</BBCard.Body>
        {showFooter && (
          <BBCard.Footer>
            <div className={styles.containerButtons}>
              {!!onConfirm && <BBButton onClick={onConfirm} text={textConfirm} variant="success" />}
              {!!onDismissRes && <BBButton onClick={onDismissRes} text={textDismiss} variant="danger" />}
              {extraFooter}
            </div>
          </BBCard.Footer>
        )}
      </BBCard>
    </div>
  );
}
