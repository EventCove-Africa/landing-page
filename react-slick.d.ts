/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-slick" {
    import React from "react";
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      [key: string]: any; // Allows additional settings
    }
  
    const Slider: React.FC<Settings>;
    export default Slider;
  }
  