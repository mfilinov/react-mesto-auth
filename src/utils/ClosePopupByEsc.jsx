import React from "react";

function ClosePopupByEsc({onClose}) {
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])
}

export default ClosePopupByEsc
