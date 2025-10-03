import { setAlert, setPhoto, setLoading,clearLoading } from "../Redux/Action/Action";;
import axios from "axios";

export const  handleProfile = async (file, filename = 'avatar', dispatch)  => {
    
   dispatch(setLoading(true))
   try{
     console.log('FORMDATA EDIT PROFILE:', file)
   const formData = new FormData();
   formData.append(filename, file);

        const res = await axios.post('http://localhost:4200/api/upload/image', formData);
        console.log('Response:',res)
        console.log('response:',res.data.message);

        console.log('IMAGE SUCCESSFULLY DISPATCHED:',res.data?.data.filename);
        dispatch(setPhoto(res.data?.data));
        dispatch(setAlert(res.data.message, 'success'))
         return res.data?.data
            
}catch (err) {
     console.error('FORMDATA ERROR:', err)
     dispatch(setAlert(err.response?.data.error, 'danger'));
        return null;
   } finally {
        dispatch(clearLoading(false))
   }
   }