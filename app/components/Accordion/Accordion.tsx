import { FC, ReactNode } from "react";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import "./styles.scss";

interface Props {
  title: ReactNode | string;
  content: ReactNode | string;
  isOpen: boolean;
  onToggle: VoidFunction;
}

const Accordion: FC<Props> = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onToggle}>
        <h2>{title}</h2>
        <span>
          {isOpen ? (
            <Icon icon="mdi:chevron-up" width={20} />
          ) : (
            <Icon icon="mdi:chevron-down" width={20} />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
