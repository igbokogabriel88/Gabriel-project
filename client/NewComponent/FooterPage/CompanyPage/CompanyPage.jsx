import { CompanyInitiation } from "../../DataCollection/data";
  import { CompanyArray } from "./CompanyArray";
  import './Company.css'

  export const Company_Page =()=>{
    return (
        <div className="companyClass"> 
           <span>{CompanyInitiation.title}</span>
           <CompanyArray itemValue={CompanyInitiation.items}/>
        </div>
    )
  }