import React from "react";
import { Link } from "react-router-dom";

export interface NavItem {
  label: string;
  path: string;
  cta?: boolean;
}

interface MobileMenuProps {
  navItems: NavItem[];
  onLinkClick: () => void;
  onCTAClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  onLinkClick,
  onCTAClick,
}) => {
  return (
    <div className="md:hidden" id="mobile-menu">
      <ul role="menu" className="px-2 pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <li key={item.label} role="none">
            {item.cta ? (
              <Link
                to={item.path}
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  onCTAClick();
                  onLinkClick();
                }}
                className="block text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                to={item.path}
                role="menuitem"
                tabIndex={0}
                onClick={onLinkClick}
                className="block text-gray-700 hover:text-gray-900 focus:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
