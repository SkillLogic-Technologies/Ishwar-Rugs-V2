import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  await transport.sendMail({
    from: `"Ishwar Rugs" <${process.env.GMAIL}>`,
    to,
    subject,
    html,
  });
};




export const orderConfirmationTemplate = (order) => {
  return `
  <h2>Thank you for your order!</h2>
  <p>Your order <strong>#${order._id}</strong> has been confirmed.</p>
  <p>Total Amount: ₹${order.totalAmount}</p>
  <p>Status: ${order.orderStatus}</p>
  <br/>
  <p>We will notify you when your order ships.</p>
  <br/>
  <p>— Ishwar Rugs Team</p>
  `;
};

export const orderStatusTemplate = (order) => {
  return `
  <h2>Order Status Updated</h2>
  <p>Your order <strong>#${order._id}</strong> status is now:</p>
  <h3>${order.orderStatus}</h3>
  <p>Total Amount: ₹${order.totalAmount}</p>
  <br/>
  <p>Thank you for shopping with Ishwar Rugs.</p>
  `;
};