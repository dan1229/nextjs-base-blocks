import React, { useState } from 'react';
import BBAlert from '../bbalert';
import BBButton from '../bbbutton';
import BBCard from '../bbcard';
import BBLink from '../bblink';
import BBLoadingSpinner from '../bbloading_spinner';
import BBModal from '../bbmodal';
import BBNavbar from '../bbnavbar';
import BBNavbarItem from '../bbnavbar_item';
import BBText from '../bbtext';
import DemoComponent from '../demo_components/demo_component';
import type { IPropsBBAlert } from '../bbalert';
import type { IPropsBBButton } from '../bbbutton';
import type { IPropsBBCard } from '../bbcard';
import type { IPropsBBLink } from '../bblink';
import type { IPropsBBLoadingSpinner } from '../bbloading_spinner';
import type { IPropsBBModal } from '../bbmodal';
import type { IPropsBBNavbar } from '../bbnavbar';
import type { IPropsBBNavbarItem } from '../bbnavbar_item';
import type { IPropsBBText } from '../bbtext';

/**
 * DEMO PAGE
 */
const DemoPage = () => {
  //
  // REGULAR COMPONENTS
  //
  // BB ALERT
  const [stateBBAlert, setStateBBAlert] = useState<IPropsBBAlert>({
    children: 'Test',
    variant: 'info',
    elevation: 'none',
    dismissible: true,
    textAlignment: 'left',
    className: '',
    onClick: () => alert('You clicked the alert!'),
  });
  // BB Button
  const [stateBBButton, setStateBBButton] = useState<IPropsBBButton>({
    text: 'Test',
    type: 'submit',
    size: 'md',
    variant: 'primary',
    elevation: 'none',
    disabled: false,
    hover: true,
    focus: false,
    icon: {
      icon: 'ICON',
      align: 'left',
    },
    idForm: '',
    className: '',
    onClick: () => alert('You clicked the button!'),
    transparent: false,
    colorText: 'white',
    href: '',
    helperTextOnHover: '',
    colorHelperTextOnHover: 'black',
  });
  // BB Card
  const [stateBBCard, setStateBBCard] = useState<IPropsBBCard>({
    colorBackground: 'primary',
    colorBorder: 'transparent',
    elevation: 'none',
    cardStyle: 'default',
    className: '',
    onClick: () => alert('You clicked the card!'),
    noBorder: false,
    children: 'TODO - fix card implementation',
  });
  // BB Link
  const [stateBBLink, setStateBBLink] = useState<IPropsBBLink>({
    children: 'Test',
    href: 'https://www.google.com',
    size: 'medium',
    color: 'primary',
    bold: false,
    italics: false,
    underline: false,
    asSpan: false,
    external: true,
    className: '',
  });
  // BB Loading Spinner
  const [stateBBLoadingSpinner, setStateBBLoadingSpinner] = useState<IPropsBBLoadingSpinner>({
    variant: 'default',
    className: '',
    size: 'md',
  });
  // BB Modal
  const [stateBBModal, setStateBBModal] = useState<IPropsBBModal>({
    children: 'Test',
    title: 'Test',
    textDismiss: 'Dismiss',
    textConfirm: 'Confirm',
    extraFooter: <></>,
    confirmCancel: true,
    outsideClickCloses: true,
    idForm: '',
    headerTextSize: 'medium',
    showButtonCancel: true,
    loading: false,
  });
  // BB Navbar
  const [stateBBNavbar, setStateBBNavbar] = useState<IPropsBBNavbar>({
    title: 'Test',
    elevation: 'none',
    imageSrc: '',
    routeBrand: '/',
    showButtonsAuth: true,
    children: <></>,
  });
  // BB Navbar Item
  const [stateBBNavbarItem, setStateBBNavbarItem] = useState<IPropsBBNavbarItem>({
    title: 'Test',
    href: 'https://www.google.com',
    className: '',
  });
  // BB Text
  const [stateBBText, setStateBBText] = useState<IPropsBBText>({
    children: 'Test',
    size: 'medium',
    bold: false,
    italics: false,
    underline: false,
    hover: false,
    asSpan: false,
    color: 'primary',
    className: '',
    onClick: () => alert('You clicked the text!'),
  });

  return (
    <div>
      <div>
        <BBLink href="https://github.com/dan1229/nextjs-base-blocks" size="xxxlarge" external underline={false}>
          NextJS Base Blocks
        </BBLink>
      </div>
      <hr />
      <BBText size="xxlarge">Demo Page</BBText>
      <BBText>
        The base blocks demonstration page is a demo and testing environment for the base blocks library in NextJS projects. It showcases
        various components such as BBAlert, BBButton, BBCard, BBLink, and BBLoadingSpinner. The page is designed to provide a visual
        representation of how these components look and function in a real-world scenario.
      </BBText>
      <hr />
      <div>
        <BBText size="xlarge">BB Components</BBText>
        <DemoComponent name="BBAlert" child={<BBAlert {...stateBBAlert} />} stateObject={stateBBAlert} setStateObject={setStateBBAlert} />
        <DemoComponent
          name="BBButton"
          child={<BBButton {...stateBBButton} />}
          stateObject={stateBBButton}
          setStateObject={setStateBBButton}
        />
        <BBButton text="Test" onClick={() => alert('You clicked the button!')} helperTextOnHover="test text" />
        <DemoComponent
          name="BBCard"
          child={
            <BBCard {...stateBBCard}>
              <BBCard.Header {...stateBBCard} />
              <BBCard.Body {...stateBBCard} />
              <BBCard.Footer {...stateBBCard} />
            </BBCard>
          }
          stateObject={stateBBCard}
          setStateObject={setStateBBCard}
        />
        <DemoComponent name="BBLink" child={<BBLink {...stateBBLink} />} stateObject={stateBBLink} setStateObject={setStateBBLink} />
        <DemoComponent
          name="BBLoadingSpinner"
          child={<BBLoadingSpinner {...stateBBLoadingSpinner} />}
          stateObject={stateBBLoadingSpinner}
          setStateObject={setStateBBLoadingSpinner}
        />
        <DemoComponent name="BBModal" child={<BBModal {...stateBBModal} />} stateObject={stateBBModal} setStateObject={setStateBBModal} />
        <DemoComponent
          name="BBNavbar"
          child={<BBNavbar {...stateBBNavbar} />}
          stateObject={stateBBNavbar}
          setStateObject={setStateBBNavbar}
        />
        <DemoComponent
          name="BBNavbarItem"
          child={<BBNavbarItem {...stateBBNavbarItem} />}
          stateObject={stateBBNavbarItem}
          setStateObject={setStateBBNavbarItem}
        />
        <DemoComponent name="BBText" child={<BBText {...stateBBText} />} stateObject={stateBBText} setStateObject={setStateBBText} />
      </div>
      <div>
        <h2>BB Form Components</h2>
        <p>TODO</p>
      </div>
    </div>
  );
};

export default DemoPage;
