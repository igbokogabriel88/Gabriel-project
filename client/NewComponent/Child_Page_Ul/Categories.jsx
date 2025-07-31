import React, { useRef, useState, useEffect } from "react";
import { TopPageData } from "../DataCollection/data";
import { IndicatorTracker } from "./IndicatorTracker";
import { getCategory } from "../Redux/Action/Action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

 const Categories = ()=> {
    const [indicatorPosition, setIndicatorPosition]= useState(0);
     const [highlight, setHighlight] = useState(false)
         const scrollRef = useRef(null);
         const dispatch = useDispatch();
         const category = useSelector(state => state.Category);
         const selected = category.name
         useEffect(()=>{
            const container = scrollRef.current;
            const handleScroll = () => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                const scrollRatio = container.scrollLeft/ maxScroll;
                setIndicatorPosition(scrollRatio * (container.clientWidth - 70))
            }
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll)
            };
         },[]);
         useEffect(()=>{
            if ( selected){
                setHighlight(true);
                const timeId = setTimeout(()=> {
                    setHighlight(false)
                }, 200);
                return ()=> clearTimeout(timeId)
            }
         },[selected])
         const handleCategory =(value)=>{
            console.log('categoryz:', value);
             dispatch(getCategory(value));
         };
        console.log('highlight:', highlight)
    return (
        <div style={{display: 'flex', flexDirection: 'column'}} >
    <div className={`category ${selected != 'all'? 'select': ''}`} ref={scrollRef}>
        {TopPageData.map(data => (
        <span className={`span-class ${selected === data.value? 'chose': ''}`}
          style={{backgroundColor: highlight && 
            selected === data.value? 'red':
            selected === data.value ? 'rgba(0, 0, 0, 0.2)': ''
          }} 
             key={data.value}
             onClick={()=> handleCategory(data.value)}>
                {data.label}</span>
        ))}
        </div>
        <IndicatorTracker value={indicatorPosition} />
        </div>
    )
}
export default Categories







