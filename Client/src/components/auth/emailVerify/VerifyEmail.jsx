import axios from "axios";
import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  console.log(queryParams);
  console.log(location.search);
  console.log(token);


  return (
    <div>VerifyEmail</div>
  )
}

export default VerifyEmail