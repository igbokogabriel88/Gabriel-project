import FrontPage from "../Child_Page_Ul/Front_page";
 import { useState, useEffect, useRef } from "react";
 import { useSelector } from "react-redux";
 import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FooterPage } from "../FooterPage/FooterPage";
import { TopBar } from "../Child_Page_Ul/TopBar";
import { Triangle_Rectangle } from "../Icons/TriangleRectangle";
import { ModalComponent } from "../ModalPage/Index";
import AccountViewPage from "../PrivatePage/Index";
import './Render_Page.css'

const RenderPage = () =>{
    const [scrolled, setScrolled] = useState(0);
    // const [category, setCategory] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showScrollbar, setShowScrollbar] = useState(false)
    const [showModal, setShowModal] = useState()
    const scrollRef = useRef();
    const location = useLocation();
    const {item} = useParams();
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const category = useSelector(state => state.Category);
    const searchInput = useSelector(state => state.search_Reducer);
    const selected = category.name;
    const searchModal = searchInput?.searchOpen;
    const currentPage = useSelector(state => state.fetchPage);
    const user = useSelector(state => state.Auths.user);
  
    // console.log('scrollPosition:',scrollPosition);
    // console.log('selected:',selected);
    // console.log('searchModal:',searchModal);

    const chosenCat = 
    ['arts', 'gaming', 'membership', 'photography', 'pfps', 'exibition'].includes(selected);
   
    // useEffect(() => {
    //    if (scrollRef.current){
    //     scrollRef.current.scrollTo({
    //       top: 0, behavior: "smooth"
    //     })
    //    }
    // },[chosenCat])

    useEffect(()=>{
      if (!selected) return;
      if (selected === 'all'){
        navigate('/')
      } else {
        navigate(`/home/${selected}`)
      }
    },[selected]);

    useEffect(() => {
      if (currentPage){
        scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
      }
    },[currentPage]);

    // useEffect(() => {
    //   if (item){
    //     navigate(`/home/${item}`)
    //   }
    // },[item])
    
    useEffect(() => {
      if (chosenCat){
        scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
      }
    },[selected])
    

    useEffect(()=> {
      let didScroll = false;

      if (location.state?.scrollTo === 'terms'){
          // window.scrollTo({top: 0, behavior: 'smooth'})
          scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
          didScroll = true;
          }
          if (didScroll){
            navigate(location.pathname, {replace: true, state: {}});
          }
      },[location, navigate]);

      useEffect(()=> {
        let didScroll = false;
  
        if (location.state?.scrollTo === 'term'){
            // window.scrollTo({top: 0, behavior: 'smooth'})
            scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
            didScroll = true;
            }
            if (didScroll){
              navigate(location.pathname, {replace: true, state: {}});
            }
        },[location, navigate]);

    //   useEffect(()=> {
    //     let didScroll = false;
    //     if (location.state?.scrollTo === 'top'){
    //         scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});
    //         didScroll = true;
    //     }
    //     if (didScroll){
    //       navigate(location.pathname, {replace: true, state: {}});
    //     }

    // },[location, navigate]);
  
  

        useEffect(()=>{
        // console.log('showbar:', setShowScrollbar);
        const showScrollBar = ()=>{
                setShowScrollbar(true);
               clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(()=>{
                    setShowScrollbar(false)
                }, 3000)
        }
        const handleScrollPosition = () =>{
            const container = scrollRef.current;
            const scrollTop = container.scrollTop;
            const maxScroll = container.scrollHeight - container.clientHeight;
                const scrollRatio = scrollTop/ maxScroll;
                setScrollPosition(scrollRatio * (container.clientWidth - 20))

        }
        const handleScroll = ()=>{
            const scrollTop = scrollRef.current.scrollTop;
                  setScrolled(scrollTop > 35)
        }
        const currentRef = scrollRef.current;
        const scrollbarRef = scrollRef.current;
        const container = scrollRef.current;
        currentRef.addEventListener('scroll', handleScroll);
        scrollbarRef.addEventListener('scroll', showScrollBar);
        container.addEventListener('scroll', handleScrollPosition)
        return () => {
              currentRef.removeEventListener('scroll', handleScroll);
              scrollbarRef.removeEventListener('mouseenter', showScrollBar);
              container.removeEventListener('scroll', handleScrollPosition);
        }
    },[])
      
      const handleClick = ()=> {
        setShowModal(!showModal)
      }
    // const categoryFunc = (value)=> {
    //      setCategory(value)
    // }
    return (
        <div className={`renderPage ${showModal ? 'show': ''}
        ${searchModal ? 'yes': ''}`} ref={scrollRef} >
        <div> 
            <span className="topBar">
         <TopBar scrollValue={scrolled} 
         /> 
         
          <Triangle_Rectangle showBar = {showScrollbar} 
            position = {scrollPosition}/>
         </span>
         
          <FrontPage
          scrollValue={scrolled}
          // handleCategory={categoryFunc}
          />
        <FooterPage/>
        </div>
        </div>
    )
}
export default RenderPage