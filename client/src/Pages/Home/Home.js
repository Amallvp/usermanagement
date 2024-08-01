import React, { useEffect, useState } from 'react'
import Header from '../../Componets/Header/Header'
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    if (!token) {
      navigate('/login'); 
    } else {
      setUser(JSON.parse(userData));
      console.log(user);
    }
  }, []);

  // Render loading or error state if user is null
  if (!user) {
    return <p>Loading...</p>; // or some other placeholder
  }

  return (
    <div className="home">
        <Header/>

<div className="homeComponents w-100 d-flex align-items-center justify-content-center ">

<div>
  <img src="https://i.postimg.cc/7hQzStbm/images.jpg" className='img-input' alt="" />
</div>

<div className='icons position-absolute d-flex'> 
<i class="fa-brands fa-facebook fs-2"></i>
<i class="fa-brands fa-twitter fs-2 ms-5"></i>
<i class="fa-brands fa-linkedin fs-2 ms-5"></i>
</div>


<div className="userDetails p-5 d-flex flex-column justify-content-center">

    <div className='w-100 mt-5' >
        <h3>Welcome {user.name} !</h3>
    </div>

    <div className='w-100 mt-5'>
    <h3>Email ID :  {user.email}</h3>
    </div>

    <div className='w-100 mt-5'>
    <h3>Company Name :  {user.company} </h3>
    </div>

</div>


</div>

    </div>
  )
}

export default Home