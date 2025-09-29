'use client'

import React from 'react';
import styled from 'styled-components';

const AnimatedName = () => {
    return(
        <StyledWrapper>
            <div className="breathe-animation">
                <span>denver</span>
            </div>
        </StyledWrapper>
    )
}
const StyledWrapper = styled.div`
    @font-face {
        font-family: 'TheFont';
        src: url("https://garet.typeforward.com/assets/fonts/shared/TFMixVF.woff2") format('woff2');
    }

    div.breathe-animation {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2vh 0;
        padding: 0;
    }

    .breathe-animation span {
        font-family: 'TheFont';
        font-size: 72px; /* Base mobile size */
        color: white;
        text-align: center;
        line-height: 0.8;
        margin: 0;
        animation: letter-breathe 3s ease-in-out infinite;
    }

    /* Tablet */
    @media (min-width: 768px) {
        .breathe-animation span {
            font-size: 96px;
        }
    }

    /* Desktop */
    @media (min-width: 1024px) {
        .breathe-animation span {
            font-size: 120px;
        }
    }
  
    @keyframes letter-breathe {
        from,
        to {
            font-variation-settings: 'wght' 100;
        }
        50% {
            font-variation-settings: 'wght' 900;
        }
    }
`
export default AnimatedName;
{/*
  Breathe animation – Variable Font, HTML 
  Code by - Type Forward  
  Link: https://codepen.io/typeforward/pen/wvNgEqy  
*/}