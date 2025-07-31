import React, { useState, useRef, useEffect } from "react";
import { Profile_Pic } from "./Profile_pic";
import Edit_Profile_view from "./Switch";
import { handleProfile } from "./photoHelper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { editProfile } from "../helperFunc";
import { clearPhoto } from "../Redux/Action/Action";

const EditProfile = ()=> {
    const [profileData, setProfileData] = useState({
        bio: '',
        social: [{facebook: '', instagram: '', youtube: ''}]
               });
    const [showProfile, setShowProfile] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [profileSuccess, setProfilesuccess] = useState(null)
;    
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.Auths);
    const profile = useSelector(state => state.profile);
    console.log('EDIT PROFILE PAGE:', auth);

    // useEffect(()=> {
    //     if (profile){
    //      dispatch(clearPhoto())
    //     };
    //      },[dispatch, profile])
    

    const handleChange = (event)=> {
          const {name, value} = event.target;
          if(['facebook', 'instagram', 'youtube'].includes(name)){
            setProfileData((prev) =>({
             ...prev,
             social: {
                ...prev.social,
                [name]: value
             }
            }))
          } else {
            setProfileData((prev) => ({
                ...prev,
                [name] : value
            }))
          }
    };
    const onFileChange =(value)=> {
        if (value) {
            setAvatar(value)
        }

   
    };
    const onHandleToggle =()=>{
        setShowProfile(
            prev => !prev
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    

       const updatedImage = profileSuccess ? profileSuccess : null;

       const { bio, social} = profileData;
       const {facebook, instagram, youtube} = social;

      const result = await editProfile(updatedImage, bio, facebook, instagram, youtube,dispatch, navigate);

      if (result) {
        dispatch(clearPhoto());
        setProfileData({...profileData, bio: '', social: {...profileData.social,
            facebook: '', instagram: '', youtube: ''
        }});
        setShowProfile(false);
        setAvatar(null)

      }
       
    }

    const handleProfileSucess = (value) => {
        setProfilesuccess(value)
    }
//  console.log('SHOW_AVATAR',avatar);
//  console.log('SHOW_SOCIAL',profileData.social);
//  console.log('SHOW_BIO',profileData.bio)
 return (
 <div className="profileClass">
 <div className="profile-wrapper">
  <span className="profile-title">
  Edit Profile
  </span>
  <form className="profile-form" onSubmit={handleSubmit}>
  <Profile_Pic 
  handleFile={onFileChange}
  showPic={showProfile}
  profileSuccess={handleProfileSucess}/> 
                 
  <div className={`profile-bio
  ${profileData.image != '' ? 'true': ''}`}>
  <label htmlFor="profile-bio">Bio</label>
  <textarea
  name="bio"
  id="profile-bio"
  value= {profileData.bio}
  onChange={handleChange}
  className="style-exhibit"
  /></div>

 <div className="profile-visible">
 <span>Make nft profile visible</span>
  <span><Edit_Profile_view
  toggle={profileData.show_profile}
  handleToggleSwitch={onHandleToggle}/></span>
  </div>
                
 <div className="edit-social">
 <span className="icon">
 <FaFacebook className="fa-icon"/>
 </span>
 <input type='text'
 name="facebook"
 placeholder="Facebook"
 value={profileData.social.facebook}
 onChange={handleChange}/>
</div>   

 <div className="edit-social">
 <span className="icon">
 <FaInstagram className="fa-icon"/>
 </span>
 <input type='text'
 name="instagram"
 placeholder="Instagram"
 value={profileData.social.instagram}
 onChange={handleChange}/>
 </div>
 <div className="edit-social">
 <span className="icon">
 <FaYoutube className="fa-icon"/>
 </span>
 <input type='text'
 name="youtube"
 placeholder="Youtube"
 value={profileData.social.youtube}
 onChange={handleChange}/>
 </div>
 <input type="submit" value='Edit Profile' className="submitClass edit"/>

</form>
</div>
</div>
    )
}
export default EditProfile