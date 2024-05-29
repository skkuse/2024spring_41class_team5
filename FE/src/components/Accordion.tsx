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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: white;
  color: black;
`;

const AccordionDetails = styled.div`
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

const InfoTable = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  margin-bottom: 20px;
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InfoRow = styled.div`
  display: contents;
`;

const InfoCell = styled.div`
  padding: 10px;
  background-color: #f7f7f7;
  text-align: center;
  border: 1px solid #ccc;
`;

interface AccordionProps {
  title: string;
  date: string;
  details: string;
  code: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, date, details, code }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Parse details to extract information
  const detailsArray = details.split(' ');

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <HeaderContent>
          <span>{title}</span>
          <span>{date}</span>
        </HeaderContent>
        <FontAwesomeIcon icon={faChevronDown} />
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>
        <AccordionDetails>
          <InfoTable>
            <InfoRow>
              <InfoCell>아코디언 이름</InfoCell>
              <InfoCell>날짜</InfoCell>
              <InfoCell>기존 탄소배출량</InfoCell>
              <InfoCell>변화된 탄소배출량</InfoCell>
              <InfoCell>탄소배출량 변화량</InfoCell>
            </InfoRow>
            <InfoRow>
              <InfoCell>{detailsArray[0]}</InfoCell>
              <InfoCell>{detailsArray[1]}</InfoCell>
              <InfoCell>{detailsArray[2]}</InfoCell>
              <InfoCell>{detailsArray[4]}</InfoCell>
              <InfoCell>{detailsArray[6]}</InfoCell>
            </InfoRow>
          </InfoTable>
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
