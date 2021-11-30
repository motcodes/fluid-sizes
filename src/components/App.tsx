import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { VisuallyHidden } from './visuallyHidden';
import Input from './customInput';
import CodeBlock from './codeBlock';
import Result from './result';
import Warning from './warning';
import oneDecimal from '../utils/oneDecimal';
import GithubIcon from './githubIcon';

function App() {
  const [exampleText, setExampleText] = useState('Result (edit me!)');
  const [minWidth, setMinWidth] = useState(700);
  const [minSize, setMinSize] = useState(1.5);
  const [maxWidth, setMaxWidth] = useState(1000);
  const [maxSize, setMaxSize] = useState(3);
  const [vwCoefficient, setVwCoefficient] = useState();
  const [remCoefficient, setRemCoefficient] = useState();

  useEffect(() => {
    setVwCoefficient(
      oneDecimal((1600 * (maxSize - minSize)) / (maxWidth - minWidth))
    );
    setRemCoefficient(
      oneDecimal(
        minSize - (minWidth * (maxSize - minSize)) / (maxWidth - minWidth)
      )
    );
  }, [maxSize, minSize, maxWidth, minWidth, vwCoefficient, remCoefficient]);

  return (
    <>
      <Wrapper>
        <Heading>Fluid Sizes</Heading>
        <Blurb>
          Create not only text that scales with the window size, so that your
          headings look great on any screen, but also other size attributes like
          width, margin, scale. This technique is taken from the{' '}
          <Link
            href="https://css-for-js.dev/"
            rel="noopener noreferrer"
            target="_blank"
          >
            wonderful CSS course by Josh Comeau
          </Link>{' '}
          and a fork from{' '}
          <Link
            href="https://fluid-typography.netlify.app/"
            rel="noopener noreferrer"
            target="_blank"
          >
            fluid-typography.netlify.app from Erik André Jakobsen
          </Link>{' '}
          project.
        </Blurb>
        <Grid>
          <h2>Minimum size</h2>
          <p>
            <Input
              value={minSize}
              onChange={(e) => setMinSize(parseInt(e.target.value) || 0)}
            />
            <code>rem</code> at a viewport width of{' '}
            <Input
              value={minWidth}
              onChange={(e) => setMinWidth(parseInt(e.target.value) || 0)}
            />
            <code>px</code>.
          </p>
          <h2>Maximum size</h2>
          <p>
            <Input
              value={maxSize}
              onChange={(e) => setMaxSize(parseInt(e.target.value) || 0)}
            />
            <code>rem</code> at a viewport width of{' '}
            <Input
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value) || 0)}
            />
            <code>px</code>.
          </p>
        </Grid>
        <CodeBlock
          noMargin
          {...{ minSize, maxSize, vwCoefficient, remCoefficient }}
        ></CodeBlock>
        <CodeBlock
          noMargin
          attribute="font-size"
          {...{ minSize, maxSize, vwCoefficient, remCoefficient }}
        ></CodeBlock>
        <CodeBlock
          attribute="width"
          {...{ minSize, maxSize, vwCoefficient, remCoefficient }}
        ></CodeBlock>
        {Math.abs(remCoefficient) < 1 && (
          <Warning>
            The number in front of the <code>rem</code> portion of the CSS rule
            should not be between -1 and 1. This makes it hard to zoom in on the
            text (try it), which reduces accessibility for visually impaired
            people.
          </Warning>
        )}
        <Result
          lines={2}
          value={exampleText}
          onChange={(e) => setExampleText(e.target.value)}
          {...{ minSize, maxSize, vwCoefficient, remCoefficient }}
        />
      </Wrapper>
      <Pusher />
      <Footer>
        <VisuallyHidden>See the original source code on GitHub.</VisuallyHidden>
        <ButtonLink
          href="https://github.com/jakobsen/fluid-typography"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubIcon />
        </ButtonLink>
        <VisuallyHidden>See the source code on GitHub.</VisuallyHidden>
        <ButtonLink
          href="https://github.com/motcodes/fluid-sizes"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src="https://matthiasoberholzer.com/static/d76fbfce7f5e39c3ba9368a46f063ba5/bf8e1/Logo.png"
            alt="Matthias Oberholzer Logo"
            width={32}
            height={32}
          />
        </ButtonLink>
      </Footer>
    </>
  );
}

const Heading = styled.h1`
  font-size: clamp(2.5rem, 3.2vw + 2rem, 4rem);
  min-height: 0vh;
  font-family: 'silkabold';
  text-align: center;
  margin: 32px;
  line-height: 1.2;
  background-size: 100%;
  background: rgb(2, 0, 36);
  background-image: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 57%,
    rgba(0, 212, 255, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
  line-height: 1.6;
`;

const Grid = styled.div`
  margin: 0 auto;
  gap: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: baseline;
  max-width: 600px;
  & h2 {
    text-align: left;
  }

  & p {
    text-align: right;
  }

  @media (max-width: 570px) {
    grid-template-columns: 1fr;
    & h2 {
      text-align: center;
    }

    & p {
      text-align: center;
    }
  }
`;

const Blurb = styled.p`
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 24px;
`;

const Pusher = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
`;

const ButtonLink = styled.a`
  color: hsl(200deg 5% 40%);

  &:hover {
    color: hsl(0deg 0% 0%);
  }
`;

const Link = styled.a`
  color: hsl(199.9deg 91.4% 36.3%);

  &:hover {
    font-family: 'silkabold';
  }
`;

export default App;
