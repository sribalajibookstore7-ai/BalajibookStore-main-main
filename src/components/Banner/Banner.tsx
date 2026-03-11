import { useMediaQuery } from '@mui/material';

import mobileBanner from "../../assets/600x200.png";
import tabletBanner from "../../assets/1200x400.png";
import desktopBanner from "../../assets/1875x625.png";


export function Banner(){
    
    const isMobile = useMediaQuery('(max-width: 639px)');
    const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
    const isDesktop = useMediaQuery('(min-width: 1024px)');

  
    return (

        <section
        className='w-full flex justify-center items-center pointer-events-none'>
            <div>
                {isMobile && <img src={mobileBanner} alt="Banner OnlineStore" />}
                {isTablet && <img src={tabletBanner} alt="Banner OnlineStore"/>}
                {isDesktop && <img src={desktopBanner} alt='Banner OnlineStore'/>}
            </div>
        </section>

    );
}

export default Banner;