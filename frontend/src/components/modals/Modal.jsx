import React from 'react';
import { useSelector } from 'react-redux';
import SongLibraryModal from './SongLibrary';
import WelcomeModal from './Welcome';

const Modal = () => {
  const modal = useSelector((state) => state.app.modal);

  switch (modal) {
    case 'welcome':
      return <WelcomeModal />;
    case 'songlibrary':
      return <SongLibraryModal />;
    default:
      return <></>;
  }
};

export default Modal;
