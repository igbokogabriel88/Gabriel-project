import React, { useEffect, useRef, useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import './Mint.css';

const Mint_Select = ({onChangeFunc, onModalShow, data, show, selectRef})=> {
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState('Select category');
    const selectData = [
        {label: 'Gaming', value: 'gaming'},
        {label: 'Membership', value: 'membership'},
        {label: 'Arts', value: 'arts'},
        {label: 'Photography', value: 'photography'},
        {label: 'PFPS', value: 'pfps'},
    ];
        //  console.log('selected:',selected)
    useEffect(()=>{
        onModalShow(modal)
    },[modal]);

    useEffect(() => {
        onChangeFunc(selected);
    },[selected])
     
    const displayModal = () => {
        setModal(!modal)
    }
    const toUpperCase = () => {
         return data.charAt(0).toUpperCase() + data.slice(1);
    }
    const handleChange = (value)=> {
            setSelected(value);
            // onChangeFunc(value);6
            setModal(!modal);

    }
    return (
        <div className='mint-select' ref={selectRef}>
            <span onClick={displayModal} 
            className={`selectvalue ${data === 'Select category' ? 'true' : ''}`}>
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
                        onChange={() => handleChange( data.value)}
                        className='check'
                        /> 
                      </span>
                    ))}</div>}
        </div>
    )
}
export default Mint_Select