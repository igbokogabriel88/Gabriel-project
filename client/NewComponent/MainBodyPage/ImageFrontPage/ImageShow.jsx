
import React, { useEffect, useRef, useState } from "react";
import './ImageShow.css'
import { fetchDummyData } from "../../helperFunc";
import { fetchData } from "../../Redux/Action/Action";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutCompany } from "./AboutCompany";

export const ImageViewPage = () =>{
   const [nfts, setNfts] = useState([]);

    const [offset1, setOffset1] = useState(0);
    const [offset2, setOffset2] = useState(0);
    const [offset3, setOffset3] = useState(0);

    const [direction1, setDirection1] = useState(1);
    const [direction2, setDirection2] = useState(-1);
    const [direction3, setDirection3] = useState(1);   
    const [pause, setPause] = useState(false)
    const maxOffset = 200;
    const dir1Ref = useRef(direction1)
    const dir2Ref = useRef(direction2)
    const dir3Ref = useRef(direction3)
    const step = 50;
    const dispatch = useDispatch();

    const loading = useSelector(state => state.Loading);
    console.log('LOADING_CATEGORY:', loading);


    const artImageGroup = nfts.filter(nft => nft.category === 'arts');
        const gamingImageGroup = nfts.filter(nft => nft.category === 'gaming');
        const photographyImageGroup = nfts.filter(nft => nft.category === 'photography');
        
        const selectedArtImage = artImageGroup.slice(0,7);
        const selectedPhotographyImage = photographyImageGroup.slice(0,7);
        const selectedGamingImage = gamingImageGroup.slice(0,7);

        const fetchNFTsData = async () => {
            let result;
               result = await fetchDummyData(dispatch);
              console.log('FETCHED DUMMY DATA:', result);
              setNfts(result?.data);
              dispatch(fetchData(result?.data))
           }
           useEffect(() => {
            fetchNFTsData()
        },[dispatch]);
    
           
             useEffect(()=>{
            
                const interval1 = setInterval(() => {
                    setOffset1(prev => {
                        const next = prev + step * dir1Ref.current;
                        if (Math.abs(next) >= maxOffset){
                              dir1Ref.current = -dir1Ref.current
                        } 
                     return next
                    });
                    setOffset3(prev => {
                        const next = prev + step * dir3Ref.current;
                        if (Math.abs(next) >= maxOffset){
                          dir3Ref.current = -dir3Ref.current
                        }
                             return next
                    });
                    setOffset2(prev => {
                        const next = prev + step * dir2Ref.current;
                        if (Math.abs(next) >= maxOffset){
                          dir2Ref.current = -dir2Ref.current
                        }
                             return next
                    });
                   
                }, 2000);
                
                return () => {
                    clearInterval(interval1);
                 }
    },[direction1, direction2, direction3]);

    
     return (
        
        <div className="image-view">
            <AboutCompany/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <div className="imageGroups">
            <div className="image-group one"
              style={{transform: `translateY(${offset1}px)`, 
             transition: 'transform 0.3s'}}
             >{
                selectedArtImage.map(art => (
                    loading === true ? <div className="imageNone"></div> :
                    <img src= {`/Upload/${art.image}`} className="imageClass"/> 
                ))
             }
                {/* <img src="/Upload/image1.jpg" className="imageClass"/>
                <img src="/Upload/image2.jpg" className="imageClass"/>
                <img src="/Upload/image3.jpg" className="imageClass"/>
                <img src="/Upload/image_7.jpg" className="imageClass"/>
             6   <img src="/Upload/image21.jpg" className="imageClass"/>
                <img src="/Upload/image20.jpg" className="imageClass"/>
                <img src="/Upload/image24.jpg" className="imageClass"/>  */}
            </div>
            </div> 
             <div className="imageGroups">
            <div className="image-group two"
             style={{transform: `translateY(${offset2}px)`,  
             transition: 'transform 0.3s' }}
                >
            {
                selectedGamingImage.map(gaming => (
                <img src= {`/Upload/${gaming.image}`} className="imageClass"/> 
                            
                 ))  
            }
            {/* <img src="/Upload/image4.jpg" className="imageClass"/>
            <img src="/Upload/image5.jpg" className="imageClass"/>
            <img src="/Upload/image_9.jpg" className="imageClass"/>
            <img src="/Upload/image_8.jpg" className="imageClass"/>
            <img src="/Upload/image17.jpg" className="imageClass"/>
            <img src="/Upload/image18.jpg" className="imageClass"/>  */}
            </div>
            </div>
             <div className="imageGroups">
            <div className="image-group three"
            style={{transform: `translateY(${offset3}px)`, 
           transition: 'transform 0.3s' }}
                >
            {
               selectedPhotographyImage.map(photo => (
                <img src= {`/Upload/${photo.image}`} className="imageClass"/> 
                            
                 )) 
            }
             {/* <img src="/Upload/image_10.jpg" className="imageClass"/>
            <img src="/Upload/image11.jpg" className="imageClass"/>
            <img src="/Upload/image6.jpg" className="imageClass"/>
            <img src="/Upload/img-7.jpg" className="imageClass"/>
            <img src="/Upload/image23.jpg" className="imageClass"/>
            <img src="/Upload/image19.jpg" className="imageClass"/>  */}
            </div>
            </div>  
            </div>
                    </div>
    
    )
}



