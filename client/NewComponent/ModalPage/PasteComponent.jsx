
export const handlePaste = async ()=> {
    const text = await navigator.clipboard.readText();
    return text;
    //add it to the setAddress state
}

//const [copied, setCopied] = useState(false);
//depositAddress = 'some values'
export const handleCopy = ()=> {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(()=> setCopied(false), 2000)
}