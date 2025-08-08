  import { CompanyArray } from "./CompanyArray";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { getCategory} from "../../Redux/Action/Action";
  import './Company.css'

  export const Company_Page =()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

     const handlePrivacyPolicyView = (value) => {
      console.log('PRIVACY_POLIcY:', value)
          navigate(`/about/${value}`,  {state:
             {focusTermAndPolicyPage: true, scrollTo: 'terms'}});
             dispatch(getCategory(value));
     };
     const handleTermOfServiceView = (value) => {
      console.log('TERMS_OF_SERVICE:', value)
           navigate(`/about/${value}`,  {state:
             {focusTermAndPolicyPage: true, scrollTo: 'terms'}});
           dispatch(getCategory(value));
     };
    const CompanyInitiation = {
      title: 'Company',
      items: [{label: 'Privacy Policy', value: 'privacy-policy', 
        onClick: () => handlePrivacyPolicyView('privacy-policy')},
              {label: 'Terms of Service', value: 'terms-of-service',
                 onClick: () =>handleTermOfServiceView('terms-of-service')
      }]
}
    return (
        <div className="companyClass"> 
           <span>{CompanyInitiation.title}</span>
           <CompanyArray itemValue={CompanyInitiation.items}/>
        </div>
    )
  }