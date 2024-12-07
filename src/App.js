import React, { useState, useRef, useEffect } from "react";
import "./styles/style.css";
import rospistory from "./img/rospis.png";
import questionIcon from "./img/Question Mark.png";
import start from "./img/icons8-start-90 1.png";
import pause from "./img/Pause.png";
import krestik from "./img/Vector.png";
import galochka from "./img/galochka.png";
import png from "./img/pngwing.com.png";
import hairyCat from "./img/волосатый кот.png";
import presentCat from "./img/подарок кот.png";
import gamingCat from "./img/сидит в ноуте кот.png";
import memCat from "./img/скала кот.png";
import dinosawr from "./img/dinosawr.png";
import fried from "./img/fried.png";
import plaki from "./img/plakiplaki.png";
import hey from "./img/hey.png";
import icecream from "./img/icecream.png";
import catssss from "./img/catssss.png";
import pngwing from "./img/pngwing.com.png";
import brainCat from "./img/умный кот.png";
import loveCat from "./img/цилует кот.png";
import { Tooltip } from "./Tooltip";
import zvuk from "./audio/zvuk.mp3";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [TooltipCycle, setTooltipCycle] = useState(1);

  const IntervalID = useRef(null); // хранит айди интервалов(исправление бага с интервалами)

  const audio = new Audio(zvuk);

  const imgCats = [
    hairyCat,
    presentCat,
    gamingCat,
    memCat,
    brainCat,
    loveCat,
    pngwing,
    catssss,
    icecream,
    hey,
    plaki,
    fried,
    dinosawr,
  ];
  const [img, setImg] = useState(loveCat);
  const [minutes25, setMinutes25] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [BigTimeOut, setBigTimeOut] = useState(false);
  useEffect(() => {
    IntervalID.current = setInterval(() => {
      const randomIndexCat = Math.floor(Math.random() * imgCats.length); // генерация рандомного индекса картинки в массвие
      setImg(imgCats[randomIndexCat]);
      console.log(img);
    }, 300000); // интервал для смены извобрадения котов

    return () => clearInterval(IntervalID.current);
  }, []);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);

    // Запуск интервала
    IntervalID.current = setInterval(() => {
      
      setTime((prevTime) => {

        setTimeout(300);

       if(prevTime < 1500){
            setMinutes25(false);
            }

        if (prevTime > 0) {
          return prevTime - 1; // Уменьшаем время
        } else {
          if (!soundPlayed) {
            audio.play();
            setSoundPlayed(true);
            setSoundPlayed(false);
          }
          clearInterval(IntervalID.current);
          IntervalID.current = null;
          setIsRunning(false);
          
          console.log(seconds);
          
          setTooltipCycle((prevCycle) => {

            if (prevCycle === 4 || prevCycle === 8 || prevCycle === 16 || prevCycle === 12) {
              setTime(900);
            }

            if(minutes25 === true) {
               console.log("Текущий цикл:", prevCycle);

            return prevCycle + 1;

            

            }else{
              return prevCycle;
            }
           
           
          });
         if(minutes25 === true){
        if(!timeOut){
          
          setTime(300)
          setTimeOut(false)
        }
        } 

        return 0;
      }
      });
    }, 1000); // Интервал 1000 мс (1 секунда)
  };

  let seconds
  // // console.log(time)

  const stopTimer = () => {
    clearInterval(IntervalID.current);
    setIsRunning(false);
    IntervalID.current = null;
    
  };

  let Add1mMinutes = () => {
    setTime((arr) => arr + 60);
  };
  let Add5mMinutes = () => {
    setTime((arr) => arr + 300);
  };
  let Add10mMinutes = () => {
    setTime((arr) => arr + 600);
  };
  let Add30mMinutes = () => {
    setTime((arr) => arr + 1800);
  };

  let Add_1mMinutes = () => {
    setTime((arr) => Math.max(arr - 60, 0));
  };
  let Add_5mMinutes = () => {
    setTime((arr) => Math.max(arr - 300, 0));
  };
  let Add_10mMinutes = () => {
    setTime((arr) => Math.max(arr - 600, 0));
  };
  let Add_30mMinutes = () => {
    setTime((arr) => Math.max(arr - 1800, 0));
  };

  let CancelButton_10000000000minutes = () => {
    setTime(0);
    setIsRunning(false);
    setMinutes25(false);
  };

  const FormatTime = () => {
    const minutes = time % 60; // короче мы минуты определяем
    const hours = Math.floor(time / 60); // это часы
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  useEffect(() => {
    if (time >= 1500 && !minutes25) {
        setMinutes25(true); // Устанавливаем minutes25 в true
        console.log('25 минут!!!');
    }
    console.log(minutes25)
}, [time, minutes25]); // Следим за time и minutes25

  return (
    <div className="App">
      <div className="header">
        <p>Pomodoro Timer</p>
        <Tooltip
          text={
            `Pomodoro Timer🍅 - работает так: вы работаете над задачей 25 минут, затем делаете короткий перерыв на 5 минут, и повторяете этот цикл четыре раза, после чего делаете длинный перерыв на 15-30 минут. Сейчас (в момент роботы таймера) ${TooltipCycle} цикл!`
          }
        >
          <div className="question-icons">
            <img src={questionIcon} alt="icon-question" />
          </div>
        </Tooltip>
      </div>

      <div className="nav">
        <div className="img">{img && <img src={img} alt="cat.png" />}</div>

        <div className="timer-button">
          <div className="timer">
            <p>{FormatTime()}</p>
          </div>
          <button onClick={startTimer} className="start-button">
            <img src={start} alt="icon-pause" />
          </button>
        </div>

        <div className="buttons">
          <div className="buttons-plus">
            <button
              onClick={CancelButton_10000000000minutes}
              className="Cancel-button"
            >
              <img src={krestik} alt="icon-break" />
            </button>

            <button onClick={Add1mMinutes} className="m1">
              <p>1m</p>
            </button>

            <button onClick={Add5mMinutes} className="m5">
              <p>5m</p>
            </button>
            <button onClick={Add10mMinutes} className="m10">
              <p>10m</p>
            </button>
            <button onClick={Add30mMinutes} className="m30">
              <p>30m</p>
            </button>
          </div>

          <div className="buttons-minus">
            <button onClick={Add_1mMinutes} className="m1-">
              <p>-1m</p>
            </button>
            <button onClick={Add_5mMinutes} className="m5-">
              <p>-5m</p>
            </button>
            <button onClick={Add_10mMinutes} className="m10-">
              <p>-10m</p>
            </button>
            <button onClick={Add_30mMinutes} className="m30-">
              <p>-30m</p>
            </button>
          </div>

          <button onClick={stopTimer} className="pause-button">
            <img src={pause} alt="icon-pause" />
          </button>
          <a
            className="Toothless-container"
            href="https://www.dreamworks.com/how-to-train-your-dragon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="Toothless">
              <img
                href="https://github.com/Peterblr/html-to-react"
                src={rospistory}
                alt="icon-toothless"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
