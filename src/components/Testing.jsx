import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Testing = () => {
    const {show,videoId} = useSelector((store) => store.videopopup?.VideoShowHandling)
    const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
    console.log(show,videoId)
    // return (
    //     <div className="App">
    //       <button onClick={openModal} className="">
    //         Click Me!
    //         {modal ? (
    //           <section className="modal__bg">
    //             <div className="modal__align">
    //               <div className="modal__content" modal={modal}>
    //                 <span
    //                   className="modal__close"
    //                   arial-label="Close modal"
    //                   onClick={setModal} >Close
    //                   </span>
    //                 <div className="modal__video-align">
    //                   {videoLoading ? (
    //                     <div className="modal__spinner">
    //                       {/* <BiLoaderAlt
    //                         className="modal__spinner-style"
    //                         fadeIn="none"
    //                       /> */}
    //                     </div>
    //                   ) : null}
    //                   <iframe
    //                     className="modal__video-style"
    //                     onLoad={spinner}
    //                     loading="lazy"
    //                     width="800"
    //                     height="500"
    //                     src="https://www.youtube.com/embed/4UZrsTqkcW4"
    //                     title="YouTube video player"
    //                     frameBorder="0"
    //                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //                     allowfullscreen
    //                   ></iframe>
    //                 </div>
    //               </div>
    //             </div>
    //           </section>
    //         ) : null}
    //       </button>
    //     </div>
    //   );
}

export default Testing