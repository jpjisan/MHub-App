"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

function Copyright() {
  return (
    <Footer container className="!bg-[#1f1e24]">
      <div className="w-full bg-[#1f1e24]">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            {/* <FooterBrand
              href="https://flowbite.com"
              alt="Flowbite Logo"
              name="Flowbite"
            /> */}
           <h1 className="text-2xl mb-5 font-bold">
        <i className="text-[#6556cd] ri-tv-fill"></i>
        <span className="  md:m-2 text-white">MHUB </span>
      </h1>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="/">MediaHUB</FooterLink>
                {/* <FooterLink href="#">Tailwind CSS</FooterLink> */}
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com/jpjisan">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full flex items-center justify-between">
          <FooterCopyright href="#" by="Jp Jisan™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="https://www.facebook.com/share/16dJTDYwbn/?mibextid=wwXIfr" icon={BsFacebook} />
            <FooterIcon href="https://www.instagram.com/_jpjisan?igsh=MTJ4MzFvbmIwZ2o3cg%3D%3D&utm_source=qr" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="https://github.com/jpjisan" icon={BsGithub} />
            {/* <FooterIcon href="#" icon={BsDribbble} /> */}
          </div>
        </div>
      </div>
    </Footer>
  );
}
export default Copyright;
