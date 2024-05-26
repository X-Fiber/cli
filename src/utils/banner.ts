import { colors } from "~packages";

export const CliBanner = `
    Y88b   d88P        8888888888 d8b 888                            
     Y88b d88P         888        Y8P 888                            
      Y88o88P          888            888                            
       Y888P           8888888    888 88888b.   .d88b.  888d888      
       d888b           888        888 888 "88b d8P  Y8b 888P"        
      d88888b   888888 888        888 888  888 88888888 888          
     d88P Y88b         888        888 888 d88P Y8b.     888          
    d88P   Y88b        888        888 88888P"   "Y8888  888          
`;

export const logBanner = () => {
  console.log(colors.bgBlack(colors.green(CliBanner)));
};
