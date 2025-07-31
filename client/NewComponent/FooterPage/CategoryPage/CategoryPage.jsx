  import { CategoryInitiation } from "../../DataCollection/data";
  import { CategoryArray } from "./CategoryArray";
  import './Category.css'

  export const Category_Page =()=>{
    console.log('cate:',CategoryInitiation.items)
    return (
        <div className="categoryClass"> 
           <span>{CategoryInitiation.title}</span>
           <CategoryArray itemValue={CategoryInitiation.items}/>
        </div>
    )
  }