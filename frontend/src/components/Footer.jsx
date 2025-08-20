import Logo from "../assets/images/LOGO3.png";
function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-darkGreen flex justify-around items-center mt-10 h-18  text-lightOrange">
        <img src={Logo} alt="GiftRedeem" className="w-24 h-24" />
        <p>Copyright &copy; {footerYear} All rights reserved</p>
        <div className="space-x-2">
          <i className="fa-brands fa-facebook fa-2xl hover:scale-125  text-lightOrange"></i>
          <i className="fa-brands fa-instagram fa-2xl hover:scale-125 t text-lightOrange"></i>
          <i className="fa-brands fa-x-twitter fa-2xl hover:scale-125 t text-lightOrange"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
