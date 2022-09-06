
export default function Length(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className='time-sets'>
        <button className='btn-arrow'
          onClick={() => props.changeTime(-60, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
          </svg>
        </button>
        <h3>{props.formatTime(props.time)}</h3>
        <button className='btn-arrow'
          onClick={() => props.changeTime(60, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
          </svg>
        </button>
      </div>
      <br />
    </div>

  )
}