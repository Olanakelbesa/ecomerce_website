export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 ">
              <span className="text-primary">Urji</span>Store
            </h3>
            <p className="">
              Your trusted destination for quality products and exceptional
              service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 ">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm  ">
              <li>
                <a
                  href="/"
                  className="hover:text-brand-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-brand-primary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="hover:text-brand-primary transition-colors"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 ">
              Categories
            </h4>
            <ul className="space-y-2 text-sm  ">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Clothing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Jewelry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 ">
              Contact
            </h4>
            <div className=" text-sm space-y-2">
              <p>Email: support@UrjiStore.com</p>
              <p>Phone: (555) 123-4567</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="hover:text-brand-primary transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
        <div className="w-full border-t border-border-color py-4 text-center text-sm mt-4 ">
          <p>&copy; 2025 UrjiStore. All rights reserved.</p>
        </div>
    </footer>
  );
}
