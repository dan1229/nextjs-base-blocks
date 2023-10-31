import React, { useState } from 'react';
import type { IPropsBBAlert } from '@/bbalert';
import BBAlert from '@/bbalert';
import type { IPropsBBButton } from '@/bbbutton';
import BBButton from '@/bbbutton';
import type { IPropsBBCard } from '@/bbcard';
import BBCard from '@/bbcard';
import type { IPropsBBLink } from '@/bblink';
import BBLink from '@/bblink';
import BBLoadingSpinner from '@/bbloading_spinner';
import type { IPropsBBModal } from '@/bbmodal';
import BBModal from '@/bbmodal';
import type { IPropsBBNavbar } from '@/bbnavbar';
import BBNavbar from '@/bbnavbar';
import type { IPropsBBNavbarItem } from '@/bbnavbar_item';
import BBNavbarItem from '@/bbnavbar_item';
import BBText from '@/bbtext';
import DemoComponent from '@/demo_components/demo_component';

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
    size: 'medium',
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
    showTextOnHover: false,
    icon: {
      icon: 'test',
      align: 'left',
    },
    idForm: '',
    className: '',
    onClick: () => alert('You clicked the button!'),
  });
  // BB Card
  const [stateBBCard, setStateBBCard] = useState<IPropsBBCard>({
    colorBackground: 'white',
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
    routeHome: '/',
    showButtonsAuth: true,
    children: <></>,
  });
  // BB Navbar Item
  const [stateBBNavbarItem, setStateBBNavbarItem] = useState<IPropsBBNavbarItem>({
    title: 'Test',
    href: 'https://www.google.com',
    className: '',
  });

  return (
    <div>
      <div>
        <BBText size="xxxlarge">NextJS Base Blocks</BBText>
        <BBText size="xlarge">Base blocks for NextJS projects.</BBText>

        {/* TODO write description of page */}
        {/* Add link to Github repo */}
      </div>
      <hr />
      <div>
        <BBText size="xxlarge">BB Components</BBText>
        <DemoComponent name="BBAlert" child={<BBAlert {...stateBBAlert} />} stateObject={stateBBAlert} setStateObject={setStateBBAlert} />
        <DemoComponent
          name="BBButton"
          child={<BBButton {...stateBBButton} />}
          stateObject={stateBBButton}
          setStateObject={setStateBBButton}
        />
        <DemoComponent
          name="BBCard"
          child={
            <BBCard {...stateBBCard}>
              <BBCard.Body {...stateBBCard} />
            </BBCard>
          }
          stateObject={stateBBCard}
          setStateObject={setStateBBCard}
        />
        <DemoComponent name="BBLink" child={<BBLink {...stateBBLink} />} stateObject={stateBBLink} setStateObject={setStateBBLink} />
        {/* This one can use whichever set method since it has no props */}
        <DemoComponent name="BBLoadingSpinner" child={<BBLoadingSpinner />} stateObject={{}} setStateObject={setStateBBAlert} />
        <DemoComponent
          name="BBModal"
          child={<BBModal {...stateBBModal} />}
          stateObject={stateBBModal}
          setStateObject={setStateBBModal}
        />
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

        <div>
          <h3>BBText</h3>
          <div>
            <p>TODO</p>
          </div>
        </div>
      </div>
      <div>
        <h2>BB Form Components</h2>
        <p>TODO</p>
      </div>
    </div>
  );
};

export default DemoPage;
