import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";

export const ProfilePic = ({handleFile})=> {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const handleClick =()=>{
        fileInputRef.current.click();
    }
        const handleFileChange =(e)=>{
            const file = e.target?.files[0];
             if (file){
                console.log('selected file:', file.name);
                setImage(file);
                handleFileChange(file)
             }
        
    }
    return (
        <div onClick={handleClick}
        className={`photo-wrapper ${image ? 'yes': ''}`} >
            <span> Exhibition Photo</span>
            {!image ? (<div className="photo-group">
            <span>Upload file</span>
             <FontAwesomeIcon icon={faFile}
             className="icon-exhibit"
             />
             <input
             type="file"
             ref={fileInputRef}
             onChange={handleFileChange}
             style={{display: 'none'}}
             />
            </div>) :
            (<div className="image-wrapper">
                <span className="imageWrap">
              <img src={image?.name} className="image"/> </span>
            <span>{image.name}</span></div>)}
        </div>
    )
}