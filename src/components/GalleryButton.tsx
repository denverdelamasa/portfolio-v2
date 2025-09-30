import React from 'react';
import Link from "next/link";
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
        <Link href="/gallery">
          <button className="GalleryBtn bg-primary mx-2">
            <div className="Gallerysign">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                <path
                  d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"
                ></path>
              </svg>
            </div>

            <div className="Gallerytext">Gallery</div>
          </button>
        </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
.GalleryBtn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
}

/* plus sign */
.Gallerysign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Gallerysign svg {
  width: 17px;
}

.Gallerysign svg path {
  fill: #fff2ff;
}
/* text */
.Gallerytext {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: #fff2ff;
  font-size: 1em;
  font-weight: 400;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.GalleryBtn:hover {
  width: 125px;
  border-radius: 6px;
  transition-duration: 0.3s;
}

.GalleryBtn:hover .Gallerysign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}
/* hover effect button's text */
.GalleryBtn:hover .Gallerytext {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.GalleryBtn:active {
  transform: translate(2px, 2px);
}

`
export default Button;