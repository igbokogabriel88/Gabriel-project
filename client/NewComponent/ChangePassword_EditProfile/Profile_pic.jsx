import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons/faFile";
import { handleProfile } from "./photoHelper";
// import { setPhoto} from "../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import { ProfileLoading } from "./NewPassword/Loading";
import './Index.css'

export const Profile_Pic = ({handleFile, profileSuccess, showPic})=> {
    const [avatar, setAvatar] = useState(null);
    const profile = useSelector(state => state.profile);
    const loading = useSelector(state => state.Loading);
    const PF = 'http://localhost:4200/images/'

    console.log('FILENAME:', profile?.filename)

    console.log( PF + profile?.filename)

    const dispatch = useDispatch();
    const fileInputRef = useRef();
    

    const handleClick =()=>{
        fileInputRef.current?.click();
    };

        const handleFileChange = async ()=>{
            const file = fileInputRef.current.files[0];
             console.log('REDUX PROFILE:',profile)
            // dispatch(setPhoto(file?.name));
            // console.log(file);

        if (!file||file.length === 0 ||
        !file.type.startsWith("image/")){
           console.log('INVALID FILE TYPE')
        return;
     } else {

        let value;

        value =   await handleProfile(file, 'avatar', dispatch);
            profileSuccess(value)
          return handleFile(file);
                
     }
          
      }
    
    return (
        <div onClick={handleClick}
        className={`profiles-wrapper ${profile ? 'yes': ''}`} >
            {!profile ? (<div className="profile-group">
            <span>Upload file</span>
             <FontAwesomeIcon icon={faFile}
             className="icon-exhibits"
             />
             <input
             type="file"
             key= 'image1'
             name = 'avatar'
             ref={fileInputRef}
             onChange={handleFileChange}
             style={{display: 'none'}}
             />
            </div>) : loading === true ? (
             <div className="image-profiles loading">
                <ProfileLoading/> </div>
            ) : showPic ?
            (<div className="image-profiles">
                <span className="imageWrapProfile">
              <img key= 'image2'
              src={PF + profile?.filename} 
              alt = '' className="image"
              style={{width: '100%', height: '100%', objectFit: 'cover'}}/> </span>
            <span>{profile?.originalname}</span>
            </div>) : (<div className="image-profiles">
                <span className="imageWrapProfile">
                    <img key = 'image3'
                    src="/Upload/image_1.jpg" 
                    alt="Default"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </span>
            </div>)}
        </div>
    )
}
