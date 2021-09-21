import React from "react";
import './report.css';

const Report = ({data, index, closingFlag, takeAction}) => {

  return (
    <div className="report">
        <div className="generalInformation">
            <p>ID: <span className="reportID">{data.id}</span></p>
            <p>State: {data.state}</p>
        </div>
        <div className="objectInformation">
            <p>Type: {data.payload.reportType}</p>
            <p>Message: {data.payload.message}</p>
        </div>
        <div className="buttonContainer">
           <button 
              className={`${closingFlag ? "closed" : ""}`} 
              disabled={closingFlag}
              onClick={() => takeAction(data.id, index)}>
                Take in
            </button> 
           <button 
              className={`${closingFlag ? "closed" : ""}`} 
              disabled={closingFlag}
              onClick={() => takeAction(data.id, index)}>
                Destroy
            </button>
        </div>
    </div>
  )
}

export default Report;
