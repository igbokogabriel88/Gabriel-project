  
  import { CategoryArray } from "./CategoryArray";
  import { useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getCategory } from "../../Redux/Action/Action";
  import './Category.css'

  export const Category_Page =()=>{
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const category = useSelector(state => state.Category);
         const select = category.name;
         console.log('CATEGORY_ITEM:', select)

    const handleArtView = (value) => {
      navigate(`/home/${value}`,  {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
    const handleGamingView = (value) => {
      navigate(`/home/${value}`, {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
    const handlePPFsView = (value) => {
      navigate(`/home/${value}`, {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
    const handlePhotographyView = (value) => {
      navigate(`/home/${value}`, {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
    const handleExhibitionView = (value) => {
      navigate(`/home/${value}`, {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
    const handleMembershipView =(value) => {
      navigate(`/home/${value}`, {state: {focusCategoryPage: true, scrollTo: 'top'}})
      dispatch(getCategory(value));
    };
     const CategoryInitiation = {
      title : 'Categories',
      items: [{
              label: 'Arts', value : 'arts', onClick: () => handleArtView('arts')},
              {label: 'Gaming', value : 'gaming', onClick: () => handleGamingView('gaming')}, 
              {label: 'PPFS', value : 'pfps', onClick: () => handlePPFsView('pfps')},
              {label: 'Membership', value : 'membership', onClick: () => handleMembershipView('membership')},
              {label: 'Photography', value : 'photography', onClick: () => handlePhotographyView('photography')},
              {label: 'Exhibition', value : 'exhibition', onClick: () => handleExhibitionView('exhibition')}]
}
    
    console.log('cate:',CategoryInitiation.items)
    return (
        <div className="categoryClass"> 
           <span>{CategoryInitiation.title}</span>
           <CategoryArray itemValue={CategoryInitiation.items}/>
        </div>
    )
  }