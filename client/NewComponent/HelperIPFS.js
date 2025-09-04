import {NFTStorage, File} from "nft.storage";
import axios from "axios";

const IPFS_KEY = (import.meta.env.VITE_STORAGE_KEY);

const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}
export const uploadTOIPFS = async (data, profile)=>{
    const {name, category, description, floorPrice} = data;
       
    // profile?.filename;
  const payload = {
    name,
    category,
    description,
    floorPrice,
     filename: {
        fileName: profile?.filename,
        pathName: profile?.path,
        originalName: profile?.originalname
    }
  };
   try{console.log('METADATA:',payload)
          const res = await axios.post(`${url}/api/fetch/nftStorage`, payload, Headers);
 -         console.log('IPFS FETCH SUCCESSFUL:',res);
          return res.data;
      } catch (err) {
          console.log(err)
      }
      
    
}

 
// headers: {
//         'Content-Type' : 'application/json',
//         'x-auth-token': localStorage.getItem('token')
//     }