import React from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EarthCanvas, StarsCanvas } from './components/canvas';

const NewHome = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `main`; 
    navigate(path);
  }
  const routeChange2 = () =>{ 
    let path = `firm`; 
    navigate(path);
  }
  return (
    <div className='newhome relative z-0 bg-black'>
      <div>
        <h1 className='heading'>Welcome To MedicHQ</h1>
      </div>
      <div className='relative second parent'>
        <div className='container child1'>
          <div className='patient '>
            <h2>Patients Portal</h2>
            <img src="https://media0.giphy.com/media/2kZhrMQsaFAmDIWIBx/giphy.gif?cid=6c09b9526okxtgmnuzqnddn1qwob4utexhmcqqtuvqsc8rei&rid=giphy.gif&ct=s" alt="patient report" width="300" height="200"/>
            <p>Want to upload your records ⁉️</p>
            <button className='btn' onClick={routeChange}>Click Here</button>
          </div>
          <div className='doctor'>
            <h2>Doctors Portal</h2>
            <img src="https://media2.giphy.com/media/LHtQ0EcqJCAU6kX2Zk/giphy.gif" alt="doctor gif" height="200"/>
            <p>Want to view patient's record ⁉️</p>
            <button className='btn' onClick={routeChange2}>Click Here</button>
          </div>
        </div>
        <div className='earth-box child2'>
          <div className='h-full earth-canvas'><EarthCanvas /></div>
        </div>
      </div>
          <div className='w-full h-full absolute inset-0'><StarsCanvas /></div>
    </div>
  )
}


export default NewHome;