// Footer.js
const Footer = () => {
    return (
      <div>
        <div className="panel-footer custom-footer-background" style={{ backgroundColor: '#228B22', padding: '10px', color: 'white' }}>
          <div className="container">
            <div className="row" >
              <section id="hours" class="col-sm-4">
                <span>Hours:</span>
                <br />
                Everyday: 9:00 till 20:00
                <hr className="visible-xs" />
              </section>
              <section id="address" className="col-sm-4">
                <span>Address:</span>
                <br />
                Gharifeh, Mount Lebanon
                <br />
                Main Street in "Sivedco Supermarket"
                <hr className="visible-xs" />
              </section>
              <section id="testimonials" className="col-sm-4">
                <p>
                  "Our vegetables and fruits are freshly sourced every day, ensuring the best prices and the highest quality of products."
                </p>
                <p>
                  "يتم الحصول على خضرواتنا وفواكهنا طازجة كل يوم، مما يضمن أفضل الأسعار وأعلى جودة للمنتجات."
                </p>
              </section>
            </div>
            <div
              className="text-center"
              style={{ backgroundColor: '#8CC84B', padding: '10px', color: 'white' }}
            >
              &copy; Copyright "Sivedco Supermarket" since 2023
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;
  