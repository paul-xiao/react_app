import React, {useState, useEffect} from 'react';

const Splash = () => {
    return (
        <div className="splash">
       <p>Page loading ...</p>
       <div className="dots">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
       </div>
    </div>
    )
}

function SplashScreen(props) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return loading &&  <Splash /> 
    
}

export default SplashScreen;