const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-sm text-gray-600">
            © 2024 Mert Sakınç. Tüm hakları saklıdır.
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200"
            >
              Gizlilik Politikası
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200"
            >
              Kullanım Şartları
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-all duration-200"
            >
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
