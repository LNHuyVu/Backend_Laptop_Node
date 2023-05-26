import db from "../models/index";
var nodemailer = require("nodemailer");
var numeral = require("numeral");

let sendEmail = async (data) => {
  try {
    // console.log(data.cart);
    const testProduct = data.cart.map((item) => {
      return `<tr style="border:1px solid black;">
          <td style="border:1px solid black;">${item.title}</td>
          <td style="border:1px solid black;">${item.quantity}</td>
          <td style="border:1px solid black;">${numeral(item.price).format(
            "0,0"
          )}</td>
          <td style="border:1px solid black;">${numeral(
            parseInt(item.quantity * item.price)
          ).format("0,0")}</td>
        </tr>`;
    });
    const product = testProduct.join("");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "lenguyenhuyvu.htn@gmail.com",
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    var mailOptions = {
      from: "VuStore",
      to: data.order.email,
      subject: "Vu Store",
      html: `<div>
      <h5>
        <b>Mã đơn hàng:${data.order.codeOrder}</b>
      </h5>
      <h5>
        <b>Xin chào: ${data.order.name}</b>
      </h5>
      <div>
        <span>
          Chúng tôi vui mừng thông báo cho bạn biết rằng chúng tôi đã nhận
          được đơn đặt hàng của bạn.
        </span>
        <br />
        <br />
        <span>
          <span>
            <b>Danh sách sản phẩm</b>
          </span>
          <br />
          <table style="border:1px solid black;">
            <tr style="border:1px solid black;">
              <th style="border:1px solid black;">Tên sản phẩm</th>
              <th style="border:1px solid black;">Số lượng</th>
              <th style="border:1px solid black;">Giá</th>
              <th style="border:1px solid black;">Thành tiền</th>
            </tr>
            ${product}
            <tr style="border:1px solid black;">
              <td colspan="4" style="border:1px solid black;">Tổng: ${numeral(
                data.total
              ).format("0,0")}</td>
            </tr>
          </table>
        </span>
        <br />
        <span>
          Sau khi gói hàng của bạn được vận chuyển, chúng tôi sẽ gửi cho bạn
          một email có số theo dõi để bạn có thể xem chuyển động của gói hàng
          của mình.
        </span>
        <br />
        <br />
        <span>
          Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi tại đây
          hoặc gọi cho chúng tôi theo số [0339 142 XXX]!
        </span>
        <br />
        <br />
        <span>Chúng tôi ở đây để hỗ trợ bạn!</span>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return data.order;
  } catch (e) {
    throw new Error(e);
  }
};
let sendEmailContact = async (data) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "lenguyenhuyvu.htn@gmail.com",
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    var mailOptions = {
      from: "VuStore",
      to: data.contact.email,
      subject: "VuStore",
      html: `<div>
      <h3>
        <b>Xin chào: ${data.contact.name}</b>
      </h3>
      <div>
        <span>
          Chúng tôi rất vui khi nhận được liên hệ từ bạn.
        </span>
        <br />
        <br />
        <span>
          <b>Nội dung liên hệ từ bạn:</b>
          <br/>
          ${data.contact.content}
        </span>
        <br />
        <span>
          <b>Phản hồi: </b>
          ${data.contact_reply.replyDetail}
        </span>
        <br />
        <span>
          Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi tại đây
          hoặc gọi cho chúng tôi theo số [0339 142 XXX]!
        </span>
        <br />
        <br />
        <span>
        Chúng tôi ở đây để hỗ trợ bạn! 
        <br/>
        Chúc bạn có một ngày tốt lành
        </span>
      </div>
    </div>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return data.order;
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  sendEmail: sendEmail,
  sendEmailContact: sendEmailContact,
};
