import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex lg:flex-row flex-col py-2 lg:py-0 items-center justify-between">
          {/* Logo */}

          <div className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Mert Sakınç. Tüm hakları saklıdır.
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Gizlilik Politikası
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Kullanım Şartları
            </Link>

            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
