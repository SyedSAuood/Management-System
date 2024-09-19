import React, { useState } from "react";

interface fromData{
  PunchInTime : string;
  PunchOutTime : string;
}

const Home: React.FC = () => {

  const [fromData,setFormData] = useState<fromData>({
    PunchInTime:'',
    PunchOutTime:'',
  });

  const Handlechange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target;
    setFormData({
      ...fromData,
      [name] : value
    })
  }

  return (
    <div>
      <label>Punch_IN_Time</label>
        <input
        name="PunchInTime"
        type="time"
        value={fromData?.PunchInTime}
        onChange={Handlechange}
        />

      <label>Punch_OUT_Time</label>
        <input
        name="PunchOutTime"
        type="time"
        value={fromData?.PunchOutTime}
        onChange={Handlechange}
        />
    </div>
  )
}

export default Home