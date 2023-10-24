package api.controller;

import javax.servlet.http.HttpServletRequest;

import api.config.PaypalPaymentIntent;
import api.config.PaypalPaymentMethod;
import api.entity.paymentEntity;
import api.repository.paymentRepository;
import api.security.config.PaypalUtils;
import api.service.PaypalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import java.net.URI;
import java.net.URISyntaxException;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/payment")
public class PaymentController {
    public static final String URL_PAYPAL_SUCCESS = "api/payment/success";
    public static final String URL_PAYPAL_CANCEL = "api/payment/cancel";
    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private PaypalService paypalService;

    @Autowired
    paymentRepository paymentRepository;

    @GetMapping("/")
    public String index(){
        System.out.println("vào 1 ");
        return "index";
    }

    @GetMapping("/pay")
    public ResponseEntity<?>  pay(HttpServletRequest request,@RequestParam("price") double price) throws URISyntaxException {
        String cancelUrl = PaypalUtils.getBaseURL(request) + "/" + URL_PAYPAL_CANCEL;
        String successUrl = PaypalUtils.getBaseURL(request) + "/" + URL_PAYPAL_SUCCESS;
        try {

            Payment payment = paypalService.createPayment(
                    price,
                    "USD",
                    PaypalPaymentMethod.paypal,
                    PaypalPaymentIntent.sale,
                    "payment description",
                    cancelUrl,
                    successUrl);

            for(Links links : payment.getLinks()){
                if(links.getRel().equals("approval_url")){
                    URI yahoo = new URI(links.getHref());
                    HttpHeaders httpHeaders = new HttpHeaders();
                    httpHeaders.setLocation(yahoo);
                    return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
                }
            }
        } catch (PayPalRESTException | URISyntaxException e) {
            log.error(e.getMessage());
            System.out.println("err "+e);
        }

        URI yahoo = new URI("http://localhost:3000/checkout");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(yahoo);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @GetMapping(URL_PAYPAL_CANCEL)
    public ResponseEntity<?> cancelPay() throws URISyntaxException {
        URI yahoo = new URI("http://localhost:3000/checkout");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(yahoo);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/success")
    public ResponseEntity<?>  successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) throws URISyntaxException {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if(payment.getState().equals("approved")){
                paymentEntity paymentEntity = new paymentEntity();
                paymentEntity.setName("PAYPAL");
                paymentEntity.setUrl(paymentId);
                paymentEntity finalpayment =  paymentRepository.save(paymentEntity);
                URI yahoo = new URI("http://localhost:3000/checkout?success=true&paymentid="+finalpayment.getId());
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.setLocation(yahoo);
                return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
            }
        } catch (PayPalRESTException e) {
            log.error(e.getMessage());
        }
        URI yahoo = new URI("http://localhost:3000/checkout");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(yahoo);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }
}