import { useState } from "react";
import "./index.scss";
import FooterChildren from "./footerchildren";
const Index = () => {
  const [home] = useState([
    "Smartphone",
    "Desktop",
    "Electronics",
    "Shoes",
    "shirts",
  ]);
  const [product] = useState(["Vendors", "Suppliers", "List", "Reviews"]);
  const [policy] = useState([
    " Terms of Use",
    "Privacy Policy",
    "Happy Return Policy",
    "Refund Policy",
  ]);
  const [support] = useState([
    "Order Track",
    "Contact Us",
    "Find My Product",
    "Help Desk",
    "Customer FAQ",
    "Writer/Publisher Request",
    "Retailer Request",
  ]);
  return (
    <div className="footer-container">
      <FooterChildren>
        <div className="footer-item">
          <h2>Home</h2>
          {home.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </div>
      </FooterChildren>
      <FooterChildren>
        <div className="footer-item">
          <h2>Product</h2>
          {product.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </div>
      </FooterChildren>
      <FooterChildren>
        <div className="footer-item">
          <h2>Policies</h2>
          {policy.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </div>
      </FooterChildren>
      <FooterChildren>
        <div className="footer-item">
          <h2>Support</h2>
          {support.map((ele, index) => {
            return <li key={index}>{ele}</li>;
          })}
        </div>
      </FooterChildren>
    </div>
  );
};

export default Index;
