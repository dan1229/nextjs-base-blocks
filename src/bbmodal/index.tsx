import classnames from 'classnames';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import BBButton from '../bbbutton';
import BBCard from '../bbcard';
import BBLoadingSpinner from '../bbloading_spinner';
import BBText from '../bbtext';
import styles from './styles.module.scss';
import type { TBBCardColorBorder, TBBModalWidth, TBBTextSize } from '../types';

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
 * @param {string=} idForm - The id of the form to submit
 * @param {TBBTextSize=} headerTextSize - The size of the header text
 * @param {boolean=} showButtonCancel - Whether to show the cancel button
 * @param {boolean=} loading - Whether to show the loading spinner
 * @param {TBBModalWidth=} width - The width of the modal
 * @param {TBBCardColorBorder} colorBorder - The color of the border
 */
export interface IPropsBBModal {
  children: React.ReactNode;
  title: string;
  onDismiss?: (args?: unknown) => void;
  textDismiss?: string;
  onConfirm?: (args?: unknown) => void;
  textConfirm?: string;
  extraFooter?: React.ReactNode;
  confirmCancel?: boolean;
  outsideClickCloses?: boolean;
  idForm?: string;
  headerTextSize?: TBBTextSize;
  showButtonCancel?: boolean;
  loading?: boolean;
  width?: TBBModalWidth;
  colorBorder?: TBBCardColorBorder;
}

/**
 * BBModal
 */
export default function BBModal(Props: IPropsBBModal): React.ReactElement {
  const {
    children,
    title,
    onDismiss,
    textDismiss = 'Cancel',
    onConfirm,
    textConfirm = 'Confirm',
    extraFooter,
    confirmCancel = false,
    outsideClickCloses = true,
    idForm,
    headerTextSize = 'xlarge',
    showButtonCancel = false,
    loading = false,
    width = 'md',
    colorBorder = 'grey_dark',
  } = Props;

  const showFooter = !!onConfirm || (!!onDismiss && showButtonCancel) || !!extraFooter;

  let onDismissRes = onDismiss;
  if (confirmCancel) {
    onDismissRes = () => {
      if (window.confirm('Are you sure you want to cancel?')) {
        onDismiss && onDismiss();
      }
    };
  }

  // outside click for detecting when to close
  const onClickContainer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      if (outsideClickCloses) {
        onDismissRes && onDismissRes();
      }
    }
  };

  React.useEffect(() => {
    // Store the original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Set overflow to hidden
    document.body.style.overflow = 'hidden';

    // Cleanup function
    return () => {
      // Restore the original overflow style
      document.body.style.overflow = originalStyle;
    };
  }, []);

  /**
   * RENDER
   */
  return (
    <div className={styles.containerModal} onClick={onClickContainer}>
      <BBCard className={classnames(styles.modal, styles[width])} colorBorder={colorBorder}>
        <BBCard.Header noPadding>
          <div className={styles.headerRow}>
            <BBText size={headerTextSize}>{title}</BBText>
            {!!onDismissRes && (
              <BBButton onClick={onDismissRes} transparent noBorder icon={{ icon: <AiOutlineClose size={20} />, color: 'danger' }} />
            )}
          </div>
        </BBCard.Header>
        <BBCard.Body className={styles.bodyModal}>{children}</BBCard.Body>
        {showFooter && (
          <BBCard.Footer noPadding>
            <div className={styles.containerButtons}>
              {loading ? (
                <BBLoadingSpinner />
              ) : (
                <>
                  {!!onConfirm && <BBButton onClick={onConfirm} text={textConfirm} variant="success" type="submit" idForm={idForm} />}
                  {!!onDismissRes && showButtonCancel && <BBButton onClick={onDismissRes} text={textDismiss} variant="danger" />}
                  {extraFooter}
                </>
              )}
            </div>
          </BBCard.Footer>
        )}
      </BBCard>
    </div>
  );
}
