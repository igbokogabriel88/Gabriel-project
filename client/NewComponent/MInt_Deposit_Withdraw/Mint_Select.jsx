import React, { useEffect, useRef, useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import './Mint.css';

const Mint_Select = ({onChangeFunc, onModalShow, show, selectRef})=> {
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState('gaming');
    const selectData = [{label: 'Gaming', value: 'gaming'},
        {label: 'Membership', value: 'membership'},
        {label: 'Arts', value: 'arts'},
        {label: 'Photography', value: 'photography'},
        {label: 'PFPS', value: 'pfps'},
    ]
    console.log('selected:',selected)
    useEffect(()=>{
        onModalShow(modal)
    },[modal])
    const displayModal = () => {
        setModal(!modal)
    }
    const toUpperCase = () => {
         return selected.charAt(0).toUpperCase() + selected.slice(1);
    }
    const handleChange = (value)=> {
            setSelected(value);
            onChangeFunc(value)
    }
    return (
        <div className='mint-select' ref={selectRef}>
            <span onClick={displayModal}>
                {toUpperCase()} 
                <FaChevronDown/></span>
                {show && <div className='modal-show'>
                    {selectData.map(data =>(
                      <span key={data.value}>
                        <label htmlFor={data.value}>{data.label}</label>
                        <input
                        type='radio'
                        id={data.value}
                        value={data.value}
                        checked = {selected === data.value}
                        onChange={() => handleChange(data.value)}
                        className='check'
                        />
                      </span>  
                    ))}</div>}
        </div>
    )
}
export default Mint_Select