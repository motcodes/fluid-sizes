import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Clipboard } from 'react-feather';
import CopyButton from './copyButton';
import { VisuallyHidden } from './visuallyHidden';

export default function CodeBlock({
  attribute = '',
  noMargin = false,
  minSize,
  maxSize,
  vwCoefficient,
  remCoefficient,
}) {
  const [clampString, setClampString] = useState<string>('');
  const [linebreakClampString, setLineBreakClampString] = useState<string>('');
  const [tippyVisible, setTippyVisible] = useState<boolean>(false);
  const [tippyText, setTippyText] = useState<string>('');
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    setClampString(
      `(${minSize}rem, ${vwCoefficient}vw ${
        remCoefficient >= 0 ? '+' : '-'
      } ${Math.abs(remCoefficient)}rem, ${maxSize}rem)`
    );

    setLineBreakClampString(
      `(\n  ${minSize}rem,\n  ${vwCoefficient}vw ${
        remCoefficient >= 0 ? '+' : '-'
      } ${Math.abs(remCoefficient)}rem\n  ${maxSize}rem\n)`
    );
  }, [minSize, vwCoefficient, remCoefficient, maxSize]);

  function showTippy(text) {
    if (!tippyVisible) {
      setTippyText(text);
      setTippyVisible(true);
      setTimeout(() => {
        setTippyVisible(false);
      }, 1500);
    }
  }

  function copyText() {
    navigator.clipboard
      .writeText(`font-size: clamp${clampString};`)
      .then(() => showTippy('Copied!'))
      .catch(() => showTippy('Could not copy to clipboard :('));
  }

  return (
    <Code remCoefficient={remCoefficient} noMargin={noMargin}>
      {attribute && <Property>{attribute}: </Property>}
      <Func>clamp</Func>
      {windowWidth > 700 ? clampString : linebreakClampString};
      <Tippy content={tippyText} visible={tippyVisible}>
        <CopyButton onClick={copyText}>
          <VisuallyHidden>Copy to clipboard</VisuallyHidden>
          <Clipboard />
        </CopyButton>
      </Tippy>
    </Code>
  );
}

const Code = styled.pre<{ remCoefficient: number; noMargin: boolean }>`
  position: relative;
  display: block;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: hsl(180deg 10% 93%);
  font-size: 1rem;
  white-space: pre-wrap;
  /* margin-bottom: ${({ remCoefficient }) =>
    Math.abs(remCoefficient) < 1 ? '32px' : '134.4px'}; */
  margin-bottom: ${({ noMargin, remCoefficient }) =>
    noMargin ? '12px' : Math.abs(remCoefficient) < 1 ? '32px' : '134.4px'};

  @media (max-width: 700px) {
    /* margin-bottom: 32px; */
    margin-bottom: ${({ noMargin, remCoefficient }) =>
      noMargin ? '12px' : Math.abs(remCoefficient) < 1 ? '32px' : '134.4px'};
  }
`;

export const Property = styled.span`
  color: hsl(320deg 100% 35%);
`;

export const Func = styled.span`
  color: hsl(200deg 100% 30%);
`;
