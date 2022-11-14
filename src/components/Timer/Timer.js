import React, { useState, useEffect} from 'react';
import Clock from './Clock'
import './timer.css'
import alarm from '../../assets/bassboosted-alarm.mp3';

function Timer()  {
  const [seconds, setSeconds] = useState('');
  const [minutes, setMinutes] = useState('');
  const [hours, setHours] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isBlank, setIsBlank] = useState(true);
  const [currentInterval, setCurrentInterval] = useState();
  const [resetCancelButton, setResetCancelButton] = useState();
  const [startPauseButton, setStartPauseButton] = useState();
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [timeOverAudio] = useState(new Audio(alarm));

  function zeroFormatter(raw) {
    if (typeof(raw) !== 'string')  {
      raw = String(raw);
    }
    if (parseInt(raw) === 0)  {
      return '';
    } else if (parseInt(raw) > 0 && parseInt(raw) < 10)  {
      return '0' + parseInt(raw);
    } else if (parseInt(raw) >= 10) {
      return parseInt(raw);
    }
  }

  useEffect(() => {
    let title = '';
    let tempHours = hours;
    let tempMinutes = minutes;
    let tempSeconds = seconds;

    if (hours === '') {
      tempHours = '00';
    }
    if (minutes === '') {
      tempMinutes = '00';
    }
    if (seconds === '') {
      tempSeconds = '00';
    }

    if (hours === '' && minutes === '' && seconds === '') {
      title = 'Timer';
    } else  {
      title = `${tempHours}:${tempMinutes}:${tempSeconds} - Timer`;
    }
    document.title = title;
  }, [hours, minutes, seconds])

  useEffect(() => {
    const reset = () => {
      setSeconds('');
      setMinutes('');
      setHours('');
    }

    const cancel = () => {
      setIsRunning(false);
      setIsPause(false);
      setIsTimeOver(false);
      clearInterval(currentInterval);
      timeOverAudio.pause();
      setSeconds('');
      setMinutes('');
      setHours('');
    }

    const start = () => {
      if (isBlank) {
        return;
      } else  {
        setIsRunning(true);
      }
    }

    const pause = () => {
      setIsPause(!isPause);
    }

    if (hours === '' && minutes === '' && seconds === '') {
      setIsBlank(true);
      setIsRunning(false);
    } else  {
      setIsBlank(false);
    }

    if (!isRunning && !isPause && !isTimeOver)  {
      setResetCancelButton(<button id='reset' onClick={reset} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-red-400 via-red-500 to-red-600 hover:from-orange-400 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/50 rounded-md transition-all duration-300 ease-out'>초기화</button>)
      setStartPauseButton(<button id='start' onClick={start} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-blue-500/50 rounded-md transition-all duration-300 ease-out'>시작</button>)
    } else if (isRunning && !isPause && !isTimeOver)  {
      setResetCancelButton(<button id='cancel' onClick={cancel} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-neutral-600 hover:to-neutral-800 hover:shadow-lg hover:shadow-gray-500/50 rounded-md transition-all duration-300 ease-out'>취소</button>)
      setStartPauseButton(<button id='pause' onClick={pause} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/50 rounded-md transition-all duration-300 ease-out'>일시정지</button>)
    } else if (isRunning && isPause && !isTimeOver)  {
      setResetCancelButton(<button id='cancel' onClick={cancel} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-neutral-600 hover:to-neutral-800 hover:shadow-lg hover:shadow-gray-500/50 rounded-md transition-all duration-300 ease-out'>취소</button>)
      setStartPauseButton(<button id='resume' onClick={pause} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/50 rounded-md transition-all duration-300 ease-out animate-pulse'>재개</button>)
    } else if (!isRunning && !isPause && isTimeOver)  {
      setResetCancelButton(<button id='cancel' onClick={cancel} className='w-1/6 h-1/2 px-4 py-2 text-xl font-bold text-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-neutral-600 hover:to-neutral-800 hover:shadow-lg hover:shadow-gray-500/50 rounded-md transition-all duration-300 ease-out animate-pulse'>취소</button>)
      setStartPauseButton(<button id='timeovericon' className='w-1/6 h-1/2 px-4 py-2 text-7xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/50 rounded-md transition-all duration-300 ease-out cursor-not-allowed animate-spin'>⏱</button>)
    }
  }, [currentInterval, timeOverAudio, isRunning, isPause, isTimeOver, isBlank, hours, minutes, seconds])

  useEffect(() => {
    if (isRunning && !isPause)  {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0)  {
          if (isNaN(parseInt(hours)) && isNaN(parseInt(minutes)) && parseInt(seconds) === 1) {
            setIsTimeOver(true);
          }
          setSeconds(zeroFormatter(parseInt(seconds) - 1));
        } else  {
            if (parseInt(minutes) > 0)  {
              setMinutes(zeroFormatter(parseInt(minutes) - 1));
              setSeconds(59);
            } else  {
              if (parseInt(hours) > 0)  {
                setHours(zeroFormatter(parseInt(hours) - 1));
                setMinutes(59);
                setSeconds(59);
              } else  {
                clearInterval(countdown);
              }
            }
        }
      }, 1000);
      setCurrentInterval(countdown);
      return () => clearInterval(countdown);
    }
  }, [isRunning, isPause, seconds, minutes, hours]);

  useEffect(() => {
    timeOverAudio.load();
    timeOverAudio.loop = true;
    timeOverAudio.volume = 0.1;
    if (isTimeOver) {
      timeOverAudio.play();
    }
  }, [timeOverAudio, isTimeOver]);

  return (
    <div id='timer' className='w-3/4 h-1/2 flex flex-col justify-center items-center bg-gray-200 rounded-3xl shadow-xl'>
      <Clock
        zeroFormatter={zeroFormatter}
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        hours={hours}
        setHours={setHours}
      />
      <div id='control' className='w-full h-1/3 flex justify-evenly'>
        {resetCancelButton}        
        {startPauseButton}
      </div>
    </div>
  )
}

export default Timer;