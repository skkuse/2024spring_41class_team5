import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCopy } from '@fortawesome/free-solid-svg-icons'

interface AccordionProps {
  title: string
  date: string
  details: string
  code: string
}

const Accordion = ({ date, details, code }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  // Parse details to extract information
  const detailsArray = details.split(' ')

  return (
    <div className="w-full p-2 bg-gray-50 transition-all">
      <div className={`flex flex-col gap-2 overflow-hidden cursor-pointer`}>
        <table
          className="p-2 table-auto text-center border-collapse border-spacing-2 border-gray-300 hover:border-b-2 transition-all"
          onClick={toggleAccordion}
        >
          <thead>
            <tr>
              <th>날짜</th>
              <th>기존 탄소배출량</th>
              <th>변화된 탄소배출량</th>
              <th>탄소배출량 변화량</th>
              <th>
                <FontAwesomeIcon className="w-4 h-4" icon={isOpen ? faChevronUp : faChevronDown} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detailsArray[0]}</td>
              <td>{detailsArray[1]}</td>
              <td>{detailsArray[2]}</td>
              <td>{detailsArray[3]}</td>
            </tr>
          </tbody>
        </table>
        <div
          className={`relative flex whitespace-pre-wrap bg-gray-200 ${isOpen ? 'h-full' : 'h-0'}`}
        >
          <div className="absolute top-2 right-2">
            <CopyToClipboard text={code}>
              <FontAwesomeIcon className="w-4 h-4 hover:text-blue-600" icon={faCopy} />
            </CopyToClipboard>
          </div>
          {/*white color*/}
          <div className="flex-1 p-5 cursor-default">{code}</div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
