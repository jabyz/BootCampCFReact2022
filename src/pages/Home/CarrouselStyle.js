import styled from "styled-components";

const CarruselStyle = styled.div`
  .container {
    position: relative;
    margin: 0 auto;
  }

  .container img {
    vertical-align: middle;
    object-fit: cover;
    max-height: 450px;
    width: 100%;
  }

  .container .content {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0); /* Fallback color */
    background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
    color: #f1f1f1;
    width: 100%;
    padding: 20px;
  }
  /* Fading animation */
  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

export default CarruselStyle;
