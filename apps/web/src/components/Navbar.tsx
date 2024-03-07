import Image from 'next/image';

export const Navbar = () => {
  return (
    <nav className="relative">
      <div className="fixed bg-blue-600 w-full flex justify-between items-center px-5 py-2">
        {/* OPEN LOGO  */}
        <div className="flex gap-60">
          <div className="inline-flex">
            <a href="/">
              <div className="hidden md:block mb-4 ml-5">
                <Image
                  
                  src="/LogoNavbar.png"
                  width={150}
                  height={150}
                  alt=" Logo Belanja Nusantara"
                />
              </div>
              <div className="block md:hidden"></div>
            </a>
          </div>
          {/* END LOGO */}

          {/* OPEN CATEGORY */}
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <div className="block relative">
                <button
                  type="button"
                  className="inline-block py-2 px-3 rounded-full relative "
                >
                  <div className="flex items-center h-5">
                    <div className="text-white">CATEGORY</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CLOSE CATEGORY */}

        {/* SEARCH BAR */}
        <div className=" inline-flex items-center w-2/6">
          <input
            className=" bg-white inster-y-0 flex-grow-0 flex-shrink pl-3 relative w-full focus:outline-none border-none border rounded-full px-1 py-1"
            type="text"
            placeholder="Search what you need"
            id="simple-search"
            name="search"
          />
        </div>
        {/* END SEARCH BAR */}

        {/* OPEN ADD TO CART */}
        <div className="flex gap-10 px-20">
          <div className="flex-initial ">
            <div className="flex justify-end items-center relative">
              <div className="flex mr-4 items-center">
                <div className="block relative">
                  <button
                    type="button"
                    className="inline-block py-2 px-3 rounded-full relative "
                  >
                    <div className="flex items-center h-5">
                      <div className="text-white">CART</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* CLOSE ADD TO CART */}

          {/* LOGIN */}
          <div className="flex-initial">
            <div className="flex justify-end items-center relative">
              <div className="flex mr-4 items-center">
                <div className="block relative">
                  <button
                    type="button"
                    className="inline-block py-2 px-3 rounded-full relative "
                  >
                    <div className="flex items-center h-5">
                      <div className="text-white">LOGIN</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* END LOGIN */}

          {/* SIGN UP */}
          <div className="flex-initial">
            <div className="flex justify-end items-center relative">
              <div className="flex mr-4 items-center">
                <div className="block relative">
                  <button
                    type="button"
                    className="inline-block py-2 px-3 rounded-full relative "
                  >
                    <div className="flex items-center h-5">
                      <div className="text-white">SIGN UP</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CLOSE SIGN UP */}
      </div>
    </nav>
  );
};
