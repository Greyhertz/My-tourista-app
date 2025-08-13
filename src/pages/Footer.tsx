import * as Icon from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-6">
      <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-4 gap-14 mb-[7rem] border-b-[1px] pb-[7rem] border-b-gray-300 dark:border-gray-800">
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="flex flex-col gap-7">
            <Link to="">
              <li>About Us</li>
            </Link>
            <Link to="">
              <li>Careers</li>
            </Link>
            <Link to="">
              <li>Blog</li>
            </Link>
            <Link to="">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Blog</h4>
          <ul className="flex flex-col gap-7">
            <Link to="">
              <li>Travel tips</li>
            </Link>
            <Link to="">
              <li>Travel Experiences</li>
            </Link>

            <Link to="">
              <li></li>
            </Link>

            <Link to="">
              <li>Press</li>
            </Link>
            <Link to="">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="flex flex-col gap-7">
            <Link to="">
              <li>Bookings</li>
            </Link>
            <Link to="">
              <li>Help Center</li>
            </Link>
            <Link to="">
              <li>Terms of Service</li>
            </Link>
            <Link to="">
              <li>Privacy Policy</li>
            </Link>
            <Link to="">
              <li>Cancellation Options</li>
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Explore</h4>
          <ul className="flex flex-col gap-7">
            <Link to="">
              <li>Destinations</li>
            </Link>
            <Link to="">
              <li>Experiences</li>
            </Link>
            <Link to="">
              <li>Travel Guides</li>
            </Link>
            <Link to="">
              <li>Airlines</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col w-28">
          <h4 className="font-bold mb-4">Follow Us</h4>
          <ul className="flex gap-3">
          <li>
            <a href="#" className="flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-300 rounded-md p-2">
              <Icon.InstagramLogo size={24} weight="regular" color="white" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center bg-blue-600 rounded-md p-2">
              <Icon.FacebookLogo size={24} weight="fill" color="white" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center bg-neutral-950 rounded-md p-2">
              <Icon.XLogo size={24} weight="regular" color="white" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center bg-white rounded-md p-2">
              <Icon.YoutubeLogo size={24} weight="fill" color="red" />
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center bg-blue-600 rounded-md p-2">
              <Icon.LinkedinLogo size={24} weight="fill" color="white" />
            </a>
          </li>
          </ul>
        </div>
      </div>
      {/* <hr className="py-7 w-5/6 text-center m-auto text-slate-600 "/> */}
      <div className="w-5/6 mx-auto flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <h2 className="text-2xl font-bold">TravelMate</h2>
          <a href="#" className="text-sm hover:underline">Privacy</a>
          <a href="#" className="text-sm hover:underline">Terms</a>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <a href="#" className="inline-flex items-center gap-2 text-sm hover:underline">
        <Icon.Question size={20} weight='fill' color='gray'/>
        Help
          </a>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
        © 2025 TravelMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
