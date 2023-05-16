import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import '../styles/loader.css';

function withLoader (){
    
 
    return (
          <div className="loader">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>

    );
  };


export default withLoader;