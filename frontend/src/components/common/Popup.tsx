import { ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Popup: React.FC<PopupProps> = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content text-gray-400 bg-base-100 shadow-xl relative">
        {props.children}
        <button
          type="button"
          className="btn absolute top-1 right-1"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
