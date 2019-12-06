import React, {useState, useEffect} from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

function Post(props) {
   const [status, setStatus] = useState(false)
   const [status1, setStatus1] = useState(true)

   const hanldePlay = () => {
    setStatus(!status)
    !status ? document.getElementById('video').play() : document.getElementById('video').pause()
   }

   useEffect(() => {
    
    document.getElementById('video').addEventListener('play', function(){
      setStatus(true)
    });
    document.getElementById('video').addEventListener('pause', function(){
      setStatus(false)
    });
   }, [])
    return (
        <div className="post">
          <div className="control">
            <div className="control-btn" onClick={hanldePlay}>
              {!status ? <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1.2 33 27">
              <path fill-rule="evenodd" clip-rule="evenodd" d="m8.48783,1.472191l0,24.66674l20.676011,-12.33337l-20.676011,-12.33337z" fill="#e2e2e2"/>
</svg>
 : <Pause />}
            </div>
          </div>
          <div className="video">
          <video id="video" autoPlay muted={status1} poster="/favicon.ico">
          <source webkit-playsinline playsinline x-webkit-airplay x5-playsinline src="/qwerty.mp4" />
          </video>
          </div>

        </div>
    );
}

export default Post;