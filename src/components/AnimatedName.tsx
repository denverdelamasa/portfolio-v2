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
        height: 20vh; /* Use full viewport height */
        margin: 0; /* Remove default margins */
        padding: 0; /* Remove default padding */
    }

    .breathe-animation span {
        font-family: 'TheFont';
        font-size: clamp(5rem, 15vw, 8rem); /* More reasonable font sizes */
        color: white;
        text-align: center;
        line-height: 1; /* Reduce line height to minimize vertical space */
        margin: 0; /* Remove margin from span */
        animation: letter-breathe 3s ease-in-out infinite;
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