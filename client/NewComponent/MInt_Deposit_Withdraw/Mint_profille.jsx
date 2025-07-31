 import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import './Mint.css'

export const MintProfilePic = ({handleFile})=> {
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
                handleFile(file)
             }
        
    }
    return (
        <div onClick={handleClick}
        className={`mint-profile-wrapper ${image ? 'yes': ''}`} >
            {!image ? (<div className="mint-group">
            <span>Upload file</span>
             <FontAwesomeIcon icon={faFile}
             className="icon-exhibits"
             />
             <input
             type="file"
             ref={fileInputRef}
             onChange={handleFileChange}
             style={{display: 'none'}}
             />
            </div>) :
            (<div className="image-mint">
                <span className="imageWrapMint">
              <img src={image?.name} className="image"/> </span>
            <span>{image.name}</span></div>)}
        </div>
    )
}
