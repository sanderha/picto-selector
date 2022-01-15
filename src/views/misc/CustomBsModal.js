// import use Effect
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { forceCheck } from 'react-lazyload';
// create CustomBsModal functional compoent
export default function CustomBsModal(props) {
    const { show, onHide, children } = props;

    useEffect(() => {
        if (show) {
            document.querySelector(".custom-bs-modal").classList.add('d-block');
            // slight delay add show class to modal
            setTimeout(() => {
                document.querySelector(".custom-bs-modal").classList.add('show');
            }, 100);
            forceCheck();
        } else {
            document.querySelector(".custom-bs-modal").classList.remove('show');
            setTimeout(() => {
                document.querySelector(".custom-bs-modal").classList.remove('d-block');
            }, 100);
        }
        
    }, [show]);

    return (
        <div>
            <div className={`fade custom-bs-modal modal`} onClick={onHide}>
                <div className="modal-dialog modal-xl modal-dialog-scrollable lazy-load-scroll-container-js" >
                    <div className="customer-bs-modal__close">
                        <FontAwesomeIcon icon={faWindowClose}  />
                    </div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}