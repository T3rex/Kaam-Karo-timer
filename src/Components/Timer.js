import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Timer() {

 
  let [displayTime, setDisplayTime] = React.useState(25*60)
  let [breakTime, setBreakTime] = React.useState(5*60)
  let [sessionTime, setSessionTime] = React.useState(25*60)
  let [timerOn, setTimerOn] = React.useState(false)
  let [onBreak, setOnBreak] = React.useState(false)

  //Formats time in min:sec 
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return ((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds))
  }

  //Change break and session length
  function changeTime(amount, type) {
    if(!timerOn){
      if (type == "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime(prevBreak => (prevBreak + amount))
      }
      else {
        if (sessionTime <= 60 && amount < 0) {
          return;
        }
        setSessionTime(prevSession => (prevSession + amount))
        if (!timerOn) {
          setDisplayTime(sessionTime + amount)
        }
      }
    }

  }

  //Resets timer to default
  function resetTime() {
    setDisplayTime(25 * 60)
    setBreakTime(5 * 60)
    setSessionTime(25 * 60)
    setTimerOn(false)
    clearInterval(localStorage.getItem('interval-id'))       
  }

  //Starts timer
  function controlTime() {
    let second = 1000;
    let date = new Date().getTime()    
    let nextDate = new Date().getTime() + second   
    if(!timerOn){
      let interval = setInterval(() =>{
        date = new Date().getTime()
        if(date > nextDate){
          setDisplayTime(prev => {
            if(prev<=0 && !onBreak){               
              setOnBreak(true)
              return (breakTime)
            }
            else if(prev<=0 && onBreak){ 
              setOnBreak(false) 
              return (sessionTime)
            }
            return prev-1
          })
          
          nextDate += second 
        }
      },30)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if(timerOn){
      clearInterval(localStorage.getItem('interval-id'))
    }
    setTimerOn(!timerOn)    
  }
   
  
  return (
    <div >
      <div className='lengths'>
        <Length
          title="Break Length"
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title="Session Length"
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <CircularProgressbarWithChildren
        value={!onBreak ? sessionTime-displayTime : breakTime-displayTime}
        text={formatTime(displayTime)}
        minValue={0}
        maxValue={!onBreak ? sessionTime : breakTime }
        styles={buildStyles({
          rotation: 1,
          strokeLinecap: 'butt',
          pathColor: '#00bfbd',
          textColor: 'white',
          trailColor: 'white'
        })}>
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <div style={{ fontSize: 30, marginBottom: 100}}>{onBreak ? "Break" : "Session"} </div>
        <div className='action-buttons'>
        <div className='play-pause'>
         <button onClick={controlTime}>
           { !timerOn ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
            </svg>
              :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
            </svg>}

          </button>   
          <button className='reset-button' onClick={resetTime}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>       
        </div>        
      </div>
      </CircularProgressbarWithChildren>

      
    </div>
  )
}

function Length(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className='time-sets'>
        <button className='btn-arrow'
          onClick={() => props.changeTime(-60, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
          </svg>
        </button>
        <h3>{props.formatTime(props.time)}</h3>
        <button className='btn-arrow'
          onClick={() => props.changeTime(60, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
          </svg>
        </button>
      </div>
      <br />
    </div>

  )
}