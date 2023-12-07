import { CSSProperties, FormEvent, useState, useEffect, useRef, cloneElement, ReactElement  } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

function App() {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const countRef = useRef(0);

  const [count, setCount] = useState(0);
  const [input, setInput] = useState(['', '']);
  const [formResult, setFormResult] = useState('');
  const [buttonEnable, setButtonEnable] = useState(false);
  const [selectedColor, setSelectedFruit] = useState('');
  const [coloredDiv, setColoredDiv] = useState<string[]>([]);
  const [formWrapperInput, setFormWrapperInput] = useState<string>('');
  const [secondCount, setSecondCount] = useState(100);
  const [textSize, setTextSize] = useState(16);
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [boxColor, setBoxColor] = useState('#fff');
  const [clonedElements, setClonedElements] = useState<ReactElement[]>([]);
  const [lastBoxStyle, setLastBoxStyle] = useState<CSSProperties>({left: '10px'});
  const [lastBoxInnerText, setLastBoxInnerText] = useState<string>('')
  

  useEffect(() => {
    inputRef.current?.focus();
    console.log('first render');
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setButtonEnable(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormResult(`${input[0]}${input[1]}`);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFruit(e.target.value);
  };

  const handleColoredDiv = () => {
    if (selectedColor) {
      setColoredDiv((prevColoredDiv) => [...prevColoredDiv, selectedColor]);
    }
    setSelectedFruit('');
  };

  const handleSecondCountBTN = () => {
    setSecondCount((prevcount) => prevcount + 1);
  };

  const countRefHandle = () => {
    countRef.current++;
    console.log(`changing count: ${countRef.current}`);
  };

  const handleSetTextSize = () => {
    setTextSize((prevcount) => prevcount + 1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  const handleGoldenBox = () => {
    boxColor === '#fff' ? setBoxColor('gold') : setBoxColor('#fff');
  };

  const handleButtonClick = () => {
    setClonedElements(prevElements => [
      ...prevElements,
      cloneElement(<div key={prevElements.length}></div>)
    ]);
  };

  const handleCornerBox = () => {
   if(lastBoxStyle.left === '10px'){
    setLastBoxStyle({ position: 'absolute', right: '10px', top: '10px'});
    setLastBoxInnerText('ESMU STŪRĪ')
   }else{
    setLastBoxStyle({left: '10px'});
    setLastBoxInnerText('')
   }
    
  }

  return (
    <div className='container'>
      <Helmet>
        <title>{documentTitle}</title>
      </Helmet>
      <div>
        <form action="" onSubmit={handleSubmit}
        className='form'
        >
          <div className='formFlex'>
          <input
          className='inputt'
            ref={inputRef}
            type="text"
            value={input[0]}
            onChange={(e) =>
              setInput((prevInput) => [e.target.value, prevInput[1]])
            }
          />
          <input
          className='inputt'
            type="text"
            value={input[1]}
            onChange={(e) =>
              setInput((prevInput) => [prevInput[0], e.target.value])
            }
          />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>{formResult}</p>
      </div>
      <div className="card">
        <div className="buttonWrapper">
          <button
            className="fiveSecButton button"
            onClick={() => console.log('button clicked')}
            disabled={!buttonEnable}
          >
            poga
          </button>
          <button
            className="count-2Button button"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <div className="count-2ButtonBox">{count * 2}</div>
        </div>
        <div>
          <button onClick={handleColoredDiv}>+</button>
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="">...</option>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="orange">orange</option>
            <option value="purple">purple</option>
            <option value="cyan">cyan</option>
            <option value="magenta">magenta</option>
          </select>
          <div className="coloredBoxes">
            {coloredDiv.map((color, index) => (
              <div
                key={index}
                className="coloredBox"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <hr className='hr'/>
      </div>
      <div className="formWrapper">
        <button
          className="secondCountBTN button"
          onClick={() => {
            handleSecondCountBTN();
            countRefHandle();
            handleSetTextSize();
          }}
        >
          +
        </button>
        <p style={{ fontSize: `${textSize}px` }}>Count: {secondCount}</p>
        <input
        className='inputt'
          type="text"
          value={formWrapperInput}
          onChange={(e) => {
            setFormWrapperInput(e.target.value);
            handleTitleChange(e);
            console.log('input change');
          }}
        />
        <p>{formWrapperInput}</p>
      </div>
      <hr className='hr' />
      <div className="boxAndButton">
        <div
          className="boxWillChangeColor"
          style={{ backgroundColor: `${boxColor}` }}
        ></div>
        <button className="button changeColorButton" onClick={handleGoldenBox}>
          Change color
        </button>
      </div>
      <button onClick={handleButtonClick}>Clone Div</button>
      <div className='boxOfClodedBoxes'>
      <div className='boxOriginal'></div>
      {clonedElements.map((element, index) => (
        <div className='boxOriginal' key={index}>{element}</div>
      ))}
    </div>
    <button className='lastButton button' 
    onClick={handleCornerBox}
    >send div to corner
    </button>
      <div className='boxWhichGoesToCorner' 
      style={lastBoxStyle}
      >
        {lastBoxInnerText}
      </div>
    </div>
  );
}

export default App;
