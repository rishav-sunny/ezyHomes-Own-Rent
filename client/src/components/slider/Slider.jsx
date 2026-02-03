import React, { useState } from 'react'
import './slider.scss'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

function Slider({images}) {
    const [imageIndex, setImageIndex] = useState(null);
  
    const direction = (direction) => {
        if(direction=="left"){
            if(imageIndex===0){
                setImageIndex(images.length-1)
            }else{
                setImageIndex(imageIndex-1)
            }
        }else if(direction=="right"){
            if(imageIndex===images.length-1){
                setImageIndex(0)
            }else{
                setImageIndex(imageIndex+1)
            }
        }
    }

    return (
    <div className='slider'>
        {imageIndex !== null && (
            <div className="fullSlider">
                <div className="arrow" onClick={() => direction("left")}>
                    <ChevronLeft size={40} color="white" />
                </div>
                <div className="imageContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow right" onClick={() => direction("right")}>
                    <ChevronRight size={40} color="white" />
                </div>
                <div className="close" onClick={() => setImageIndex(null)}>
                    <X size={30} color="white" />
                </div>
            </div>
        )}
        <div className="bigImage">
            <img src={images[0]} alt="" onClick={() => setImageIndex(0)}/>
        </div>
        <div className="smallImages">
            {images.slice(1).map((image, index) => (
                <img src={image} alt="" key={index} onClick={() => setImageIndex(index+1)}/>
            ))}
        </div>
    </div>
  )
}

export default Slider