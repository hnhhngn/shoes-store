package api.service;

import api.entity.orderdetailEntity;
import api.entity.ordersEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Component
public class sendMailService {
    @Autowired
    JavaMailSender emailSender;

    public String sendHtmlEmail(String mailto, String subject, ordersEntity  order) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        boolean multipart = true;
        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");
        String header = "<h3>SHOPSHOES</h3> ";
        String header1 = "<h4>Đon Hang</h4> ";
        String t1 = "<table>" +
                "<tr>\n" +
                "    <th>Ten San Pham</th>\n" +
                "    <th>Gia</th>\n" +
                "    <th>So luong</th>\n" +
                "    <th>Tong</th>\n" +
                "  </tr>";

        String body ="";
        for (orderdetailEntity orderdetail : order.getOrderdetailEntities()) {
           body += " <tr>\n" +
                   "    <td>"+orderdetail.getProductdetailEntity().getProductsEntity().getName()+"</td>\n" +
                   "    <td>"+orderdetail.getPrice()+"</td>\n" +
                   "    <td>"+orderdetail.getQuantity()+"</td>\n" +
                   "    <td>"+orderdetail.getPrice()*orderdetail.getQuantity()+"</td>\n" +
                   "  </tr>";
        }
        String t2 = "</table>";
        String t3 = "<p>Thanh Tien "+order.getTotal()+"</p>";
        String foot =   "<h2>Cam On Da Su Dung Dich Vu</h2>"
                +"<img src='https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1630164926587-Capture.png'>";

        String htmlMsg = header + header1 + t1 + body + t2 +t3+ foot;
        message.setContent(htmlMsg, "text/html");
        helper.setTo(mailto);
        helper.setSubject(subject);
        this.emailSender.send(message);
        return "Email Sent!";
    }


    public String sendHtmlWelcomeEmail(String mailto, String subject) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        boolean multipart = true;
        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");
        String header = "<h3>SHOPSHOES</h3> ";
        String header1 = "<h4>Ban da dang ky thanh cong</h4> ";
        String foot =   "<h2>Cam On Da Su Dung Dich Vu</h2>"
                +"<img src='https://s3.us-east-2.amazonaws.com/myawsbucketappfile/1630164926587-Capture.png'>";

        String htmlMsg = header + header1 + foot;
        message.setContent(htmlMsg, "text/html");
        helper.setTo(mailto);
        helper.setSubject(subject);
        this.emailSender.send(message);
        return "Email Sent!";
    }


}
