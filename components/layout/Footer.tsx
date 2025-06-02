export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">UrjiStore</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Your trusted destination for quality products and exceptional
              service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition-colors">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Jewelry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="text-gray-300 dark:text-gray-400 space-y-2">
              <p>Email: support@UrjiStore.com</p>
              <p>Phone: (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 UrjiStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
