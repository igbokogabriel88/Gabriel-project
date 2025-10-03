import React, { useRef, useState } from "react";
import { handleProfile } from "../../ChangePassword_EditProfile/photoHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";

export const ProfilePic = ({handleFile, image})=> {
    const fileInputRef = useRef(null);
    const handleClick =()=>{
        fileInputRef.current.click();
    }
        const handleFileChange = async (e) => {
        const file = fileInputRef.current.files[0];
                                
        if (!file||file.length === 0 ||
        !file.type.startsWith("image/")){
        console.log('INVALID FILE TYPE')
            return;
            } else {
                    
        let value;
                    
        value =   await handleProfile(file, 'avatar', dispatch);
        console.log('Exhibition_pic:', value);
                   handleFile(value);
                                    
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
             name= "photo"
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