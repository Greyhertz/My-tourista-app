import * as Icon from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
export default function Footer()
{
  
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
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
        <div className="text-wrap flex flex-col w-20">
          <h4 className="font-bold mb-4 :">Follow Us</h4>
          <ul className="flex gap-4 ">
            <Link to="">
              <li className="bg-gradient-to-b from-purple-700 via-purple-00 via-pink-700  to-yellow-100   font-sans rounded-md">
                <Icon.InstagramLogo
                  size={24}
                  className="size-10 "
                  weight="regular"
                  color="white"
                />
              </li>
            </Link>
            <Link to="">
              <li className="bg-blue-600 rounded">
                <Icon.FacebookLogo
                  size={24}
                  fontWeight={20}
                  weight="fill"
                  color="white"
                  className="size-10"
                />
              </li>
            </Link>
            <Link to="">
              <li className="bg-neutral-950 rounded">
                <Icon.XLogoIcon size={40} weight="regular" color="white" />
              </li>
            </Link>
            <Link to="">
              <li className="bg-white rounded">
                <Icon.YoutubeLogo size={40} weight="fill" color="red" />
              </li>
            </Link>

            <Link to="">
              <li className="rounded bg-blue-600">
                <Icon.LinkedinLogoIcon
                  size={40}
                  weight="fill"
                  color="black"
                  // #2563eb
                />
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <hr className="py-7" />
      <p className="text-center text-sm mt-8">
        © 2025 TravelMate. All rights reserved.
      </p>
    </footer>
  );
}
