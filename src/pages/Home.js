import React from 'react';
// import background from "https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/12/12/2fa2638e-1ca7-11ea-8971-922fdc94075f_image_hires_174609.JPG";

const Home = () =>{
  return (
    <div className="container" style={{ 
      backgroundImage: `url("https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/12/12/2fa2638e-1ca7-11ea-8971-922fdc94075f_image_hires_174609.JPG")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '93.80vh'
    }}>
      <h3 style={{color: 'white', display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh', position: 'sticky'}}>WELCOME TO THE VOLCANO ARCHIVES</h3>
      {/* <div>
        <img src="https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/12/12/2fa2638e-1ca7-11ea-8971-922fdc94075f_image_hires_174609.JPG" width={"100%"} height={"100%"}/>
      </div> */}
    </div>
  );
}
export default Home;