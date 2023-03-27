import React from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EarthCanvas, StarsCanvas } from './components/canvas';
import reports from "./assets/reports.gif";
// import doctors from "./assets/doctors.gif";

const NewHome = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `main`;
    navigate(path);
  }
  const routeChange2 = () => {
    let path = `firm`;
    navigate(path);
  }
  return (
    <div className='newhome relative z-0 bg-black'>
      <div>
        <h2 className='heading'>Welcome To MedicHQ</h2>
      </div>
      <div className='subheading'>
        A decentralised healthcare system to preserve and exchange patient data <br /> between hospitals, laboratories, pharmacies and physicians
      </div>

      <div className="relative second parent">
        <div className="container child1">
          <div className="patient ">
            <h2 style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}>Patients Portal</h2>
            <img src={reports} width="300" height="200" />
            <p style={{ fontFamily: 'cursive' }}>Want to upload your records ⁉️</p>
            <div className="btn-center">
              <button className="btn-main" onClick={routeChange}>
                Click Here
              </button>
            </div>
          </div>
          <div className="doctor">
            <h2 style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}>Doctors Portal</h2>
            <img src="https://media2.giphy.com/media/LHtQ0EcqJCAU6kX2Zk/giphy.gif" alt="doctor gif" height="200" />
            <br />
            <p style={{ fontFamily: 'cursive' }}>Want to view patient's record ⁉️</p>
            <div className="btn-center">
              <button className="btn-main" onClick={routeChange2}>
                Click Here
              </button>
            </div>
          </div>
        </div>
        <div className="earth-box child2">
          <div className="h-full earth-canvas">
            <EarthCanvas />
          </div>
        </div>
      </div>
      <div className='w-full h-full absolute inset-0'><StarsCanvas /></div>
    </div>
  )
}


export default NewHome;