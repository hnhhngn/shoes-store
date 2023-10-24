package api.controller;

import api.DTO.GoogleAccount;
import api.entity.customersEntity;
import api.entity.roleEntity;
import api.entity.role_name;
import api.entity.usersEntity;
import api.payload.request.LoginRequest;
import api.payload.request.SignupRequest;
import api.payload.response.JwtResponse;
import api.payload.response.MessageResponse;
import api.repository.customersRepository;
import api.repository.roleRepository;
import api.repository.usersRepository;
import api.security.config.GoogleUtils;
import api.security.config.JwtUtils;
import api.security.config.RestFB;
import api.security.service.UserDetailsImpl;
import api.service.customersService;
import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class authController {
    @Autowired
    customersService customersService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private GoogleUtils googleUtils;

    @Autowired
    private RestFB restFb;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    usersRepository userRepository;

    @Autowired
    roleRepository roleRepository;

    @Autowired
    customersRepository customersRepository;

    @Autowired
    api.service.sendMailService sendMailService;



    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws ParseException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,jwt));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        usersEntity userEntity = new usersEntity(signUpRequest.getEmail(), signUpRequest.getFirstname(),
                signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<roleEntity> roleEntities = new HashSet<>();

        if (strRoles == null) {
            roleEntity userRoleEntity = roleRepository.findByName(role_name.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roleEntities.add(userRoleEntity);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "author":
                        roleEntity authorRoleEntity = roleRepository.findByName(role_name.AUTHOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roleEntities.add(authorRoleEntity);

                        break;
                    case "admin":
                        roleEntity adminRoleEntity = roleRepository.findByName(role_name.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roleEntities.add(adminRoleEntity);
                        break;
                    default:
                        roleEntity userRoleEntity = roleRepository.findByName(role_name.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roleEntities.add(userRoleEntity);
                }
            });
        }

        userEntity.setRoles(roleEntities);
        userRepository.save(userEntity);
        //create default customer profile and shope card
        customersService.createcustomer(signUpRequest,userEntity);

//        try {
//            sendMailService.sendHtmlWelcomeEmail(userEntity.getEmail(),"registered successfully");
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }



    @GetMapping("/login-google")
    public ResponseEntity<?> loginGoogle(HttpServletRequest request) throws IOException, ParseException, URISyntaxException {
        System.out.println("login witht google");
        String code = request.getParameter("code");
        if (code == null || code.isEmpty()) {
            System.out.println("login fail");
            return ResponseEntity.badRequest().body("Error login with gmail");
        }
        String accessToken = googleUtils.getToken(code);
        GoogleAccount googlePojo = googleUtils.getUserInfo(accessToken);

        System.out.println("user "+googlePojo.getEmail()+"-"+googlePojo.getName()
                +"-"+googlePojo.getId()+"-"+googlePojo.getPicture());
        //signup USER
        Optional<usersEntity> user = userRepository.findByUsername(googlePojo.getEmail());
        if(!user.isPresent()){
            System.out.println("Create new user");
            String[] name = googlePojo.getEmail().split("@");
            usersEntity userEntity = new usersEntity(googlePojo.getEmail(), name[0],
                    googlePojo.getEmail(), encoder.encode(googlePojo.getId()));

            Set<roleEntity> roleEntities = new HashSet<>();
            roleEntity userRoleEntity = roleRepository.findByName(role_name.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roleEntities.add(userRoleEntity);
            userEntity.setRoles(roleEntities);
            usersEntity users =  userRepository.save(userEntity);

            //signup customer
            customersEntity customer = new customersEntity();
            customer.setUsersEntitys(users);
            customersRepository.save(customer);
        }
        System.out.println("login user");
        // auththen account
        System.out.println("check -"+googlePojo.getEmail()+"-"+googlePojo.getId());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(googlePojo.getEmail(),googlePojo.getId()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("login success");
        URI yahoo = new URI("http://localhost:3000/login?platform=google&token="+jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(yahoo);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }


    @GetMapping("/login-facebook")
    public ResponseEntity loginFacebook(HttpServletRequest request) throws ClientProtocolException, IOException, ParseException, URISyntaxException {
        String code = request.getParameter("code");
        if (code == null || code.isEmpty()) {
            System.out.println("login fail");
            return ResponseEntity.badRequest().body("Error login with facebook");
        }
        String accessToken = restFb.getToken(code);
        com.restfb.types.User userfb = restFb.getUserInfo(accessToken);

        //signup USER
        Optional<usersEntity> user = userRepository.findByUsername(userfb.getId());
        if(!user.isPresent()){
            System.out.println("Create new user");
            usersEntity userEntity = new usersEntity(userfb.getId(), userfb.getName(),
                    "", encoder.encode(userfb.getId()));

            Set<roleEntity> roleEntities = new HashSet<>();
            roleEntity userRoleEntity = roleRepository.findByName(role_name.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roleEntities.add(userRoleEntity);
            userEntity.setRoles(roleEntities);
            usersEntity users =  userRepository.save(userEntity);

            //signup customer
            customersEntity customer = new customersEntity();
            customer.setUsersEntitys(users);
            customersRepository.save(customer);
        }
        System.out.println("login user");
        // auththen account
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userfb.getId(),userfb.getId()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("login success");

        URI yahoo = new URI("http://localhost:3000/login?platform=facebook&token="+jwt);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(yahoo);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);

    }
}
