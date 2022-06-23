import { useState, useEffect } from 'react'
import {sliderInfo} from '../../data'
import '../../styles/Slider.css'


export default function Slider() {
    const [slide, setSlide] = useState(0)
    const [counter, setCounter] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            if (counter < sliderInfo.length -1) {
                setSlide(oldSlide => oldSlide !== (sliderInfo.length -1) ? oldSlide + 1 : 0)
                setCounter(!counter)
            }
        }, 8000)
    }, [counter])

    function changeSlide(plus) {
        if (slide < sliderInfo.length -1) {
            setSlide(oldSlide => plus ? oldSlide + 1 : oldSlide !== 0 ? oldSlide - 1 : (sliderInfo.length -1))
        }else if (slide === (sliderInfo.length -1)) {
            setSlide(oldSlide => plus ? 0 : oldSlide - 1)
        }
    }

    const style = {
        width: "100%",
        height: "38vw",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${sliderInfo[slide].img})`,
        backgroundSize: "100%",
        transition: "background 0.5s ease-in-out",
    }

    return(
        <div className="slide" style={style}>
            <button onClick={() => changeSlide(false)} className="slider-buts left-but">{"<"}</button>
            <button onClick={() => changeSlide(true)} className="slider-buts rigth-but">{">"}</button>
        </div>

    )
} 