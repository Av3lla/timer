import React from 'react';

function Clock(props)  {
  const setTime = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    if (parseInt(value) < 0 || isNaN(parseInt(value[value.length-1]))) {
      if (id === 'hours')  {
        props.setHours('');
      } else if (id === 'minutes') {
        props.setMinutes('');
      } else if (id === 'seconds') {
        props.setSeconds('');
      }
      return;
    } else if (value[0] !== '0' && value.length > 2)  {
      return;
    }

    if (id === 'hours')  {
      props.setHours(props.zeroFormatter(value));
    } else if (id === 'minutes') {
      props.setMinutes(props.zeroFormatter(value));
    } else if (id === 'seconds') {
      props.setSeconds(props.zeroFormatter(value));
    }
  }

  return (
    <div id='clock' className='w-full h-3/4 flex justify-center items-center'>
        <input id='hours' type='text' value={props.hours} placeholder='00' onChange={setTime} className='w-1/5 h-2/3 text-8xl text-center text-gray-700 bg-gray-300 rounded-l-lg outline-none'></input>
        <span className='w-1/12 h-2/3 flex items-center pt-16 text-2xl font-bold text-gray-500 bg-gray-300'>h</span>
        <input id='minutes' type='text' value={props.minutes} placeholder='00' onChange={setTime} className='w-1/5 h-2/3 text-8xl text-center text-gray-700 bg-gray-300 rounded-none outline-none'></input>
        <span className='w-1/12 h-2/3 flex items-center pt-16 text-2xl font-bold text-gray-500 bg-gray-300'>m</span>
        <input id='seconds' type='text' value={props.seconds} placeholder='00' onChange={setTime} className='w-1/5 h-2/3 text-8xl text-center text-gray-700 bg-gray-300 rounded-none outline-none'></input>
        <span className='w-1/12 h-2/3 flex items-center pt-16 text-2xl font-bold text-gray-500 bg-gray-300 rounded-r-lg'>s</span>
    </div>
  )
}

export default Clock;