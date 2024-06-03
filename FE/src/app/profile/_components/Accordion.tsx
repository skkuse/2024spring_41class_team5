import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

interface AccordionProps {
  title: string;
  date: string;
  details: string;
  code: string;
}

const Accordion = ({ title, date, details, code }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Parse details to extract information
  const detailsArray = details.split(" ");

  return (
    <div className="w-full p-2 bg-gray-50 transition-all">
      <div
        className="flex items-center justify-between p-2 select-none cursor-pointer"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <div className="flex gap-2 items-center">
          <span>{date}</span>
          <FontAwesomeIcon
            className="w-4 h-4"
            icon={isOpen ? faChevronUp : faChevronDown}
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 overflow-hidden ${
          isOpen ? "h-full" : "h-0"
        }`}
      >
        <table className="p-2 table-auto text-center border-collapse border-spacing-2">
          <thead>
            <tr>
              <th>아코디언 이름</th>
              <th>날짜</th>
              <th>기존 탄소배출량</th>
              <th>변화된 탄소배출량</th>
              <th>탄소배출량 변화량</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detailsArray[0]}</td>
              <td>{detailsArray[1]}</td>
              <td>{detailsArray[2]}</td>
              <td>{detailsArray[4]}</td>
              <td>{detailsArray[6]}</td>
            </tr>
          </tbody>
        </table>
        <div className="relative p-2 flex whitespace-pre-wrap">
          <div className="absolute top-2 right-2">
            <CopyToClipboard text={code}>
              <FontAwesomeIcon className="w-4 h-4" icon={faCopy} />
            </CopyToClipboard>
          </div>
          <div className="flex-1">{code}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
