import styled from 'styled-components';

const Progress = styled.div`
  width: 90%;
  height: 15px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const Dealt = styled.div<{ dealt: number }>`
  background-color: ${(props) => props.theme.redColor || 'red'};
  width: ${(props) => props.dealt}%;
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  dealt: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ dealt }) => (
  <Progress>
    <Dealt dealt={dealt} />
  </Progress>
);

export default ProgressBar;
