import React, { useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AccordionContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
`;

const AccordionHeader = styled.div`
  background-color: #f1f1f1;
  padding: 10px;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: white;
  color: black;
`;

const AccordionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
  color: black;
`;

const CodeEditor = styled.pre`
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f5f5f5;
  white-space: pre-wrap;
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface AccordionProps {
  title: string;
  details: string;
  code: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, details, code }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <span>{title}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>
        <AccordionDetails>
          <span>{details}</span>
        </AccordionDetails>
        <CodeEditor>
          <CopyToClipboard text={code}>
            <CopyButton>복사</CopyButton>
          </CopyToClipboard>
          {code}
        </CodeEditor>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;
