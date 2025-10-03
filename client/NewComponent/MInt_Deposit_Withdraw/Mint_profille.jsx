 import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { handleProfile } from "../ChangePassword_EditProfile/photoHelper";
import { useSelector, useDispatch } from "react-redux";
import './Mint.css'

export const MintProfilePic = ({handleFile})=> {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
     const profile = useSelector(state => state.profile);
    const loading = useSelector(state => state.Loading)
    // console.log('PROFILE && LOADING:', profile, loading)
    const PF = 'http://localhost:4200/images/'
    // console.log('PF:', PF);
    // console.log('PROFILE:', profile)

    const handleClick =()=>{
        fileInputRef.current.click();
    }
        const handleFileChange = async (e)=>{
            
             const file = fileInputRef.current.files[0];
                        
                    if (!file||file.length === 0 ||
                    !file.type.startsWith("image/")){
                       console.log('INVALID FILE TYPE')
                    return;
                 } else {
            
                    let value;
            
                    value =   await handleProfile(file, 'avatar', dispatch);
                      return handleFile(file);
                            
                 }
    }
    return (
        <div onClick={handleClick}
        className={`mint-profile-wrapper ${image ? 'yes': ''}`} >
            {!profile ? (<div className="mint-group">
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
            </div>) : loading === true ? <div className="image.mint yes"></div> :
            (<div className="image-mint">
                <span className="imageWrapMint">
              <img src={PF + profile.filename} className="image"/> </span>
            <span>{profile.originalname}</span></div>)}
        </div>
    )
}
