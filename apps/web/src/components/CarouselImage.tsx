'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const imageData: ImageInfo[] = [
  { src: '/Hero01.jpg', alt: 'Hero01' },
  { src: '/Hero02.jpg', alt: 'Hero02' },
  { src: '/Hero03.jpg', alt: 'Hero03' },
];

export default function CarouselImage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  //   return (
  //     <div className="w-full lg:max-w-5xl mx-auto">
  //       <Carousel className="relative">
  //         <CarouselContent>
  //           {imageData.map((image, index) => (
  //             <CarouselItem key={index}>
  //               <div className="p-1">
  //                 <Card>
  //                   <CardContent className="w-max h-fit flex aspect-banner items-center justify-center p-6">
  //                     <Image
  //                       src={image.src}
  //                       alt={image.alt}
  //                       width={0}
  //                       height={0}
  //                     />
  //                   </CardContent>
  //                 </Card>
  //               </div>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>
  //       </Carousel>
  //     </div>
  //   );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-screen-md "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imageData.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <center>
                  <CardContent className=" bg-center max-w-fit flex justify-center p-5">
                    <Image
                      className="max-w-full border rounded-lg"
                      src={image.src}
                      alt={image.alt}
                      width={2000}
                      height={2000}
                    />
                  </CardContent>
                </center>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
